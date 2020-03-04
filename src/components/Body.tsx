import React, {Component} from 'react';
import './Body.css';
import ImageDisplay from "./ImageDisplay";
import {Auth} from "aws-amplify";
import {API} from "../config";
import {RedactedImage} from "./RedactedImage";
import Dropzone from "react-dropzone";

class Body extends Component {

    state = {
        images: []
    };

    async componentDidMount() {
        const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
        fetch(API + '/image', {
            method: 'get',
            headers: new Headers({
                'Authorization': jwtToken,
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ images: data})
        })
        .catch(console.log)
    }

    render() {
        return (
            <div className="body">
                {this.createDropzone()}
                {this.state.images.map((image: RedactedImage, index: number) =>
                    <ImageDisplay
                        key={image.imageUrl}
                        imageUrl={image.imageUrl}
                        text={image.text}
                        phoneNumber={image.phoneNumber}
                        date={image.date}
                        backgroundColor={index % 2 === 0 ? '#fff' : '#ccc'}
                    />
                    )}
            </div>
        );
    }

    private createDropzone() {
        return <Dropzone onDrop={(acceptedFiles: File[]) => {
            for (let file of acceptedFiles) {
                const extension = file.name.split('.').pop();
                if (extension === 'jpeg' || extension === 'png') {
                    console.log('is jpeg or png');
                }
            }
        }}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag and drop .png or .jpeg image, or click to select files</p>
                    </div>
                </section>
            )}
        </Dropzone>;
    }
}

export default Body;
