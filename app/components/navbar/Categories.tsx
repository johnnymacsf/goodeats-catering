'use client';

import { SiFoodpanda } from "react-icons/si";
import Container from "../Container";
import { IoDiamond, IoFastFoodSharp, IoFishSharp } from "react-icons/io5";
import { GiBarbecue, GiChicken, GiFullPizza, GiIndianPalace, GiIsland, GiJapan, GiSandwich, GiSouthKorea, GiTacos } from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdOutlineCookie } from "react-icons/md";
import { IoIosIceCream } from "react-icons/io";
import { LuCakeSlice } from "react-icons/lu";

export const categories = [
    {
        label: 'Chinese',
        icon: SiFoodpanda,
        description: "This restaurant serves Chinese-American food!"
    },
    {
        label: 'American',
        icon: IoFastFoodSharp,
        description: "This restaurant serves classic American diner food!"
    },
    {
        label: 'Japanese',
        icon: GiJapan,
        description: "This restaurant serves Japanese food!"
    },
    {
        label: 'Mexican',
        icon: GiTacos,
        description: "This restaurant serves Mexican food!"
    },
    {
        label: 'Seafood',
        icon: IoFishSharp,
        description: "This restaurant serves seafood!"
    },
    {
        label: 'Pizza',
        icon: GiFullPizza,
        description: "This restaurant serves pizza!"
    },
    {
        label: 'Barbecue',
        icon: GiBarbecue,
        description: "This restaurant serves classic southern barbecue staples!"
    },
    {
        label: 'Sandwiches',
        icon: GiSandwich,
        description: "This restaurant serves sandwiches and foot-long sub-sandwiches!"
    },
    {
        label: 'Indian',
        icon: GiIndianPalace,
        description: 'This restaurant serves Indian food!' 
    },
    {
        label: 'Korean BBQ',
        icon: GiSouthKorea,
        description: 'This restaurant serves Korean Barbecue!'
    }, 
    {
        label: 'Hawaiian ',
        icon: GiIsland,
        description: 'This restaurant serves Hawaiian cuisine!'
    }, 
    {
        label: 'Wings',
        icon: GiChicken,
        description: 'This restaurant serves chicken wings!'
    },
    {
        label: 'Cookies',
        icon: MdOutlineCookie,
        description: 'This bakery serves a wide variety of cookies!'
    },
    {
        label: 'Ice Cream',
        icon: IoIosIceCream,
        description: 'This ice cream bar has a wide variety of ice cream flavors, toppings, and cones!'
    }, 
    {
        label: 'Cake',
        icon: LuCakeSlice,
        description: 'This bakery serves a wide selection of cakes!'
    },
    {
        label: 'Gourmet',
        icon: IoDiamond,
        description: 'This restaurant serves gourmet and fine-dining cuisine!'
    }

]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null;
    }


    return(
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon}/>
                ))}
            </div>
        </Container>
    );   
}

export default Categories;