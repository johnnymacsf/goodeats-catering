'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import qs from 'query-string';
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS{
    INTRO = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.INTRO);
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const onBack = useCallback(()=>{
        setStep((value)=> value - 1);
    }, []);

    const onNext = useCallback(()=>{
        setStep((value)=> value + 1);
    }, []);

    const onSubmit = useCallback(async ()=>{
        if(step !== STEPS.INFO){
            return onNext();
        }
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            guestCount,
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true});

        setStep(STEPS.INTRO);
        searchModal.onClose();

        router.push(url);
    }, [step, searchModal, router, guestCount, dateRange, onNext, params]);

    const actionLabel = useMemo(()=> {
        if(step === STEPS.INFO){
            return 'Search';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.INTRO){
            return 'undefined';
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you want to eat?" subtitle="Find the perfect restaurant to cater from."/>
        </div>
    );

    if(step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When do you plan to have your meal?" subtitle="Make sure all your guests are free!"/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>  
        );
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More information" subtitle="Find your perfect restaurant to cater from!"/>
                <Counter title="Guests" subtitle="How many guests are coming?" value={guestCount} onChange={(value)=> setGuestCount(value)}/>
            </div>
        );
    }
    return(
        <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title="Filters" actionLabel={actionLabel} secondaryAction={step === STEPS.INTRO ? undefined : onBack} secondaryActionLabel = {secondaryActionLabel} body={bodyContent}/>

    );
}

export default SearchModal;