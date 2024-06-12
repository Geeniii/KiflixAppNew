import { MainHero } from "../Components/MainHero";
import { RowComponent } from "../Components/RowComponent";
import { request } from "../Request/request";


export const Home = ()=>{
    return(
        <div class="bg-gray-950">
            <MainHero />
            <RowComponent rowId='1' title='Top Rated' fetchUrl={request.requestTopRated}/>
            <RowComponent rowId='2' title='Popular' fetchUrl={request.requestPopular}/>
            <RowComponent rowId='3' title='Upcoming' fetchUrl={request.requestUpComing}/>
        </div>
    )
}