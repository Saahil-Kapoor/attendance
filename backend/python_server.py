from flask import Flask,request,jsonify
import base64
from PIL import Image,ImageDraw
from io import BytesIO
import numpy as np
import face_recognition
import pickle
app = Flask(__name__)

def decode_base64_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))
        image = image.convert('RGB')
        return np.array(image)
    except Exception as e:
        print("Error decoding base64 image:", e)
        return None

def extract_face(base64_string):
    image = decode_base64_image(base64_string)
    if image is not None:
        face_location = face_recognition.face_locations(image)
        if face_location:
            top,right,bottom,left = face_location[0]
            face_image = image[top:bottom,left:right]
            return face_image
        else:
            print("No face found in the image")
            return None
    else:
        print("Failed to decode base 64 image")
        return None

def ndarray_to_base64(ndarray):
    try:
        image_bytes = ndarray.tobytes()
        base64_encoded = base64.b64decode(image_bytes)
        base64_string = base64_encoded.decode("utf-8")
        return base64_string
    except Exception as e:
        print("Error encoding ndarray to base64: ",e)
        return None


def function_image_processing(requestData):
    base64_string = requestData

# Extract face from base64 image
    face_image = extract_face(base64_string)
    if face_image is not None:
        # Display or save the extracted face image
        extracted_face = Image.fromarray(face_image)
        #extracted_face.show()  # Display the extracted face
        # If you want to save the extracted face to a file
        extracted_face.save("extracted_face.jpg")
    if face_image is None:
        return "No face found in the image"
    results = []
    with open("trained_knn_model.clf", 'rb') as f:
        knn_clf = pickle.load(f)
            
    image = face_recognition.load_image_file("extracted_face.jpg")
    X_face_locations = face_recognition.face_locations(image)
            
    if len(X_face_locations) != 0:
        faces_encodings = face_recognition.face_encodings(image, known_face_locations=X_face_locations)

                # Use the KNN model to find the best matches for the test face
        closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
        are_matches = [closest_distances[0][i][0] <= 0.4 for i in range(len(X_face_locations))]
        predictions = [(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]
        lp = 0
        for name, (top, right, bottom, left) in predictions:
            resarray = {}
            resarray["name"] = name
            resarray["accuracy"] = closest_distances[0][lp][0]
            results.append(resarray)
            lp = lp + 1
    print(results)
    return results
@app.route('/predict',methods=['POST'])
def predict():
    data = request.json['base64Data']
    result = function_image_processing(data)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
