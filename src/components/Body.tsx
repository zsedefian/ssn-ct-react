import React, {Component} from 'react';
import './Body.css';
import ImageDisplay from "./ImageDisplay";
import {Auth} from "aws-amplify";
import {API} from "../config";
import {RedactedImage} from "./RedactedImage";
import Dropzone from "react-dropzone";

class Body extends Component {

    state = {
        images: [new RedactedImage('Loading...', 'Loading...', 'Loading...', '', '')],
        jwtToken: ''
    };

    async componentDidMount() {
        this.setState({ jwtToken : 'Bearer ' + (await Auth.currentSession()).getIdToken().getJwtToken() });
        fetch(API + '/image', {
            method: 'get',
            headers: {
                Authorization: this.state.jwtToken,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ images: data }))
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
            acceptedFiles.forEach((file) => {
                console.log("Uploading image...");
                this.toBase64(file).then(async base64File => {
                    await fetch(API + '/image', {
                        method: 'post',
                        headers: {
                            Authorization: this.state.jwtToken,
                            'Content-Type': 'application/json'
                        },
                        body: base64File
                    });
                }).then(() => {
                    console.log("Image has been uploaded.");
                    this.setState({imageLinks : []})
                })
            });
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

    private toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const fileType = file.name.split('.').pop();
        if (fileType === 'jpeg' || fileType === 'png') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result.toString());
                } else {
                    console.log("FileReader result was not a string.")
                }
            };
            reader.onerror = error => reject(error);
        } else {
            console.log("You attempted to upload a file that wasn't a jpeg or png.")
        }
    });
}

export default Body;
