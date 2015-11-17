import Foundation

import UIKit

public class ImageProcessor{
    
    let myImage : RGBAImage
    let RedAverage : Int
    let BlueAverage : Int
    let GreenAverage : Int
    let TotalAverage : Int
    let DefaultParamater : Int
    let GreyValue: Int
   
  
    
    public init(image: RGBAImage)
    {
        self.myImage = image
        var Red = 0
        var Green = 0
        var Blue = 0
        
        let sum = image.width * image.height
        
        for i in 0..<image.width{
            for j in 0..<image.height{
                let index = j * image.width + i
                var pixel = image.pixels[index]
                Red = Red + Int(pixel.red)
                Green = Green + Int(pixel.green)
                Blue = Blue + Int(pixel.blue)
            }
        }
        
        RedAverage = Red / sum;
        GreenAverage = Green / sum;
        BlueAverage = Blue / sum;
        TotalAverage = RedAverage + BlueAverage + GreenAverage
        GreyValue = TotalAverage/3;
        DefaultParamater = 25;
        
    }
    
    
//Just multiples the RGB values by my default paramter
    public func MyDefault() -> RGBAImage
    {
    
        let newImage : RGBAImage = myImage
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                
                let Deltar = Int(pixel.green) - GreenAverage
                
                pixel.green = UInt8(max(min(255,GreenAverage + 2 * Deltar),0))
                
                let Deltag = Int(pixel.red) - RedAverage
                
                pixel.red = UInt8(max(min(255,RedAverage + 3 * Deltag),0))
                
                let Deltab = Int(pixel.blue) - BlueAverage
                
                pixel.blue = UInt8(max(min(255,BlueAverage + 1 * Deltab),0))
                
                newImage.pixels[index] = pixel
            }
        }
        
        return newImage;

    }
    
//This function changes the contrast of the image to kinda look like a negative contrast
    public func NegContrast(mod:Int = 100) -> RGBAImage
    {
        let newImage : RGBAImage = myImage
        let factor : Int = (259*(mod+255)) / (259*(mod-255))
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                
                let red :Int = Int(pixel.red)
                let x : Int = (red - 128);
                
                let green :Int = Int(pixel.green)
                let y : Int = (green - 128);
                
                let blue :Int = Int(pixel.blue)
                let z : Int = (blue - 128);
                
                pixel.red = UInt8(max(min(255, factor * x + 128),0))
                   pixel.green = UInt8(max(min(255, factor * y + 128),0))
                   pixel.blue = UInt8(max(min(255, factor * z + 128),0))
                
                newImage.pixels[index] = pixel
            }
        }
        return newImage;
        
    }
    
//Grey Scale function with the option of using a a default value
    public func Grey(mod:Int = 1) -> RGBAImage
    {
        let newImage : RGBAImage = myImage
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                
                
                let red :Int = Int(pixel.red)
                let green :Int = Int(pixel.green)
                let blue :Int = Int(pixel.blue)

                let GreyVal : Int = (red + green + blue) / 3
                
                pixel.red = UInt8(max(min(255,GreyVal * mod),0))
                
                pixel.green = UInt8(max(min(255,GreyVal * mod),0))
                pixel.blue = UInt8(max(min(255,GreyVal * mod),0))
                
                newImage.pixels[index] = pixel
                
            }
        }
        return newImage;
        
    }
    
    
//Adjusts the intensity of Red Pixels, I set the default to 5 if the user doesn't specify. If the value is 1 there wont be any change
    public func RedIntensity(mod:Int = 5) -> RGBAImage
    {
        let newImage : RGBAImage = myImage
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                let Delta = Int(pixel.red) - RedAverage
                
                pixel.red = UInt8(max(min(255,RedAverage + mod * Delta),0))
                
                newImage.pixels[index] = pixel
            }
        }
        
        return newImage
    }
    
//Adjusts the intensity of Green Pixels, I set the default to 5 if the user doesn't specify. If the value is 1 there wont be any change
    public func GreenIntensity(mod:Int = 5) -> RGBAImage{
        let newImage : RGBAImage = myImage
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                let Delta = Int(pixel.green) - GreenAverage
                
                pixel.green = UInt8(max(min(255,GreenAverage + mod * Delta),0))
                
                newImage.pixels[index] = pixel
            }
        }
        
        return newImage
    }
//Adjusts the intensity of Blue Pixels, I set the default to 5 if the user doesn't specify. If the value is 1 there wont be any change
    public func BlueIntensity(mod:Int = 5) -> RGBAImage{
        let newImage : RGBAImage = myImage
        
        for i in 0..<newImage.width{
            for j in 0..<newImage.height{
                let index = j * newImage.width + i
                var pixel = newImage.pixels[index]
                let Delta = Int(pixel.blue) - BlueAverage
                
                pixel.blue = UInt8(max(min(255,BlueAverage + mod * Delta),0))
                
                newImage.pixels[index] = pixel
            }
        }
        
        return newImage
    }
    
 
    //Lets the user choose the filter which they want, they just have to specify the name of the filter. If the user doesnt specify then the default type is the default filter
    public func ChooseFilter(name: String = "MyDefault") -> RGBAImage{
        
        if (name == "RedIntensity")
        {
            return RedIntensity();
        }
    
        if (name == "GreenIntensity")
        {
            return GreenIntensity();
        }
        
        if (name == "BlueIntensity")
        {
            return BlueIntensity();
        }
        if(name == "MyDefault")
        {
            return MyDefault();
        }
        if(name == "Grey")
        {
                return Grey();
        }
        if(name == "NegContrast")
        {
            return NegContrast();
        }

        else
        {
            return MyDefault();
        }
    }
    
//Function for setting multiple functions
    
public func SetFilters(name: Set<String>) -> RGBAImage
    {
        for names in name{
            ChooseFilter(names)
        }
        return myImage
    }
}


