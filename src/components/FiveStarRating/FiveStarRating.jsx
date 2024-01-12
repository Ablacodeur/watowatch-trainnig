import s from "./style.module.css"
import {StarFill, Star, StarHalf} from "react-bootstrap-icons"
export function FiveStarRating({}){
   const rating = 3.5
    const starList =[];
    const starFillCount = Math.floor(rating);
    const hasStarHalf = rating - starFillCount >= 0.5;
    const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 :0);

    for( let i= 1 ; i <= starFillCount ; i++){
        starList.push(<StarFill key={"star-fill" + i} />)
    }
    if(hasStarHalf){
        starList.push(<StarHalf key={"star-half" } />)
    }
    for( let i= 1 ; i <= emptyStarCount ; i++){
        starList.push(<Star key={"star-empty" + i} />)
    }



    return(
    <div> 
       {starList}
    </div>)
}