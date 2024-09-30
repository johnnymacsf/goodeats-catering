import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import RestaurantsClient from "./RestaurantsClient";
import getListings from "../actions/getListings";

const RestaurantsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }
    const listings = await getListings({ 
        userId: currentUser.id
    });
    if(listings.length == 0){
        return(
            <ClientOnly>
                <EmptyState title="No restaurants found" subtitle="Looks like you haven't listed any restaurants." />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <RestaurantsClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default RestaurantsPage;