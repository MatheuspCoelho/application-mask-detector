import modeloJson from './modelos/modelo-1.json';

import { browser, tensor } from '@tensorflow/tfjs';

import * as knnClassifier from'@tensorflow-models/knn-classifier';
import * as mobilenetModule from'@tensorflow-models/mobilenet';


export class NeuralClassifier {

  public hasMask: boolean = false;

  private classifier: any;
  private mobilenet: any;

  private modelo: any = modeloJson;

  constructor() { }

  public async setup(){
    this.mobilenet = await mobilenetModule.load();
    this.classifier = knnClassifier.create();

    let modelJson = this.modelo;

    Object.keys(modelJson).forEach((key) => {
      modelJson[key] = tensor(modelJson[key], [modelJson[key].length / 1024, 1024]);
    })
  
    await this.classifier.setClassifierDataset(modelJson);
      
    console.log('MODELO LOADED')
  }

  public async predict(image: any){
    const modeledimage = this.mobilenet.infer( image, 'conv_preds');
    const predict = await this.classifier.predictClass(modeledimage);

    return predict.label;
  }
}