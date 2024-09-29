import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import CateringsClient from "./CateringsClient";

const CateringsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }
    const reservations = await getReservations({ 
        userId: currentUser.id
    });
    if(reservations.length == 0){
        return(
            <ClientOnly>
                <EmptyState title="No caterings found" subtitle="Looks like you haven't reserved any caterings yet." />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <CateringsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default CateringsPage;