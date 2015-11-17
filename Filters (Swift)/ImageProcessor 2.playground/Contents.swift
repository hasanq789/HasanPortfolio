import UIKit

let image = UIImage(named: "sample")!

//Creating images to apply filters onto
let rgbaImage = RGBAImage(image: image)!
let rgbaImage2 = RGBAImage(image: image)!
let rgbaImage3 = RGBAImage(image: image)!
let rgbaImage4 = RGBAImage(image: image)!
let rgbaImage5 = RGBAImage(image: image)!

let imageProcessor = ImageProcessor(image: rgbaImage)
let imageProcessor1 = ImageProcessor(image: rgbaImage2)
let imageProcessor2 = ImageProcessor(image: rgbaImage3)
let imageProcessor3 = ImageProcessor(image: rgbaImage4)
let imageProcessor4 = ImageProcessor(image: rgbaImage5)

// Using only one filter (My default filter)
let test = imageProcessor.MyDefault().toUIImage();



//Using a filter with a default value -- all filters can be used with a default value
let test1 = imageProcessor1.NegContrast(50).toUIImage();

//Can also put in a value to change the grey effect
let test2 = imageProcessor2.Grey().toUIImage();


// Using one filter by specifying its name
//Filters: MyDefault, NegContrast, Grey, RedIntensity, GreenIntensity, BlueIntensity

let test3 = imageProcessor3.ChooseFilter("BlueIntensity").toUIImage()

//Using Multiple filters one after another
let filternames : Set<String> = ["RedIntensity","BlueIntensity","GreenIntensity"]
let test4 = imageProcessor4.SetFilters(filternames).toUIImage()

