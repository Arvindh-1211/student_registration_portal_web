import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../Components/InputField";
import Form from "../Components/Form";
import Button from "../Components/Button";

function StudentRegForm() {
    const formData= {
        name: "dfg"
    }
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: formData
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            {/* <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email")} />
                <InputField registerProps={register("name")} />
                <Button value="Submit" />
            </form> */}
            <Form handleSubmit={handleSubmit(onSubmit)} heading="Data">
                <InputField registerProps={register("name")} />
            </Form>
        </div>
    )
}

export default StudentRegForm
