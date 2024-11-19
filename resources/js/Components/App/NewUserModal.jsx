import TextAreaInput from "../TextAreaInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import UserPicker from "@/Components/App/UserPicker";
import { useForm, usePage } from "@inertiajs/react";
import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import Checkbox from "../Checkbox";

export default function NewUserModal({ show = false, onClose = () => {} }) {
    const { emit } = useEventBus();

    const { data, setData, processing, reset, post, errors } = useForm({
        name: "",
        email: "",
        is_admin: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                emit("toast.show", `Пользователь "${data.name}" создан`);
                closeModal();
            },
        });
    };

    const closeModal = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={closeModal}>
            <form onSubmit={submit} className="p-6 overflow-y-auto">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                   Создать нового пользователя
                </h2>

                <div className="mt-8">
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput 
                            id="name"
                            className="block w-full mt-1"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput 
                            id="email"
                            className="block w-full mt-1"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                    
                    <InputError className="mt-2" message={errors.email} />
                </div>
                
                <div className="mt-4">
                <label className="flex items-center">
                        <Checkbox
                            name="is_admin"
                            checked={data.is_admin}
                            onChange={(e) =>
                                setData("is_admin", e.target.checked)
                            }
                        />
                        <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                            Администратор
                        </span>
                    </label>

                    <InputError className="mt-2" message={errors.is_admin} />
                </div>
                
                <div className="flex justify-end mt-6">
                    <SecondaryButton onClick={closeModal}>
                        Отмена
                    </SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Создать
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}