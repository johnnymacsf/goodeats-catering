'use client';

import useListRestaurantModal from "@/app/hooks/listRestaurantModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    INFO = 1,
    IMAGES = 2,
    DESCRIPTION = 3,
    PRICE = 4
}

const ListModal = () => {
    const listModal = useListRestaurantModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const listRestaurant = useListRestaurantModal();
    const [isLoading, setIsLoading] = useState(false);
    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const guestCount = watch('guestCount');
    const imageSrc = watch('imageSrc');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value)=> value - 1);
    }
    const onNext = () => {
        setStep((value)=> value+1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            listModal.onClose();
        })
        .catch(()=> {
            toast.error('Something went wrong');
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your restaurant's cuisine?" subtitle="Pick a category of food"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=> (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon}/>
                    </div>
                ))}
            </div>
        </div>
    )
    if(step ===  STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your restaurant" subtitle = "Add details about your catering menu, special deals, etc." />
                <Counter title="Guests" subtitle="How many guests can you serve at a maximum?" value={guestCount} onChange={(value)=>setCustomValue('guestCount', value)}/>
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your restaurant!" subtitle="Show guests what your restaurant looks like"/>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your restaurant?" subtitle="Keep it short and sweet!"/>
                <Input id = "title" label = "Title" disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id = "description" label = "Description" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Set your price" subtitle="How much do you charge per guest?" />
                <Input id="price" label="Price" formatPrice={true} type="number" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        )
    }

    return(
        <Modal 
            title="List your restaurant"
            isOpen={listRestaurant.isOpen}
            onClose = {listRestaurant.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel = {secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default ListModal;