import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEventBus } from "@/EventBus";

export default function MessageOptionsDropdown({ message, setLocalMessages }) {

    const {emit, on} = useEventBus();
    
    const onMessageDelete = () => {
        console.log("Delete message");

        axios
            .delete(route("message.destroy", message.id))
            .then((res) => {
                emit('message.deleted', {message, prevMessage: res.data.message});
            })
            .catch((error) => {
                console.error(error);
                });
    }
    
    // console.log(message.id)

    useEffect(() => {
        const offDeleted = on('message.deleted', message.id);
        return () => {
            offDeleted();
        }
    }, [message.id])
    
    const messageDeleted = (message) => {
        // if (selectedConversation &&
        //     selectedConversation.is_group &&
        //     selectedConversation.id == message.group_id
        // ) {

            setLocalMessages((prevMessages) => {
                return prevMessages.filter((m) => {
                    return m.id !== message.id
                });
            });
            // const offDeleted = on('message.deleted', message.id);

        // }

        // if (
        //     selectedConversation &&
        //     selectedConversation.is_user &&
        //     (selectedConversation.id == message.sender_id ||
        //          selectedConversation.id == message.receiver_id)
        //         ) {
        //     setLocalMessages((prevMessages) => {
        //         return prevMessages.filter((m) => m.id !== message.id);
        //     });
        // }
    };

    const clickDouble = (message) => {
        onMessageDelete()
        messageDeleted(message)
    }
    
    return (
        <div className="absolute text-gray-100 -translate-y-1/2 right-full top-1/2">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/40">
                     <EllipsisVerticalIcon className="w-5 h-5" />   
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute left-0 z-[100] w-48 mt-2 bg-gray-800 rounded-md shadow-lg">
                        <div className="px-1 py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                    onClick={() => clickDouble(message)}
                                    className={`${
                                        active
                                            ? "bg-black/30 text-white"
                                            : "text-gray-100"
                                    } group flex w-full items-center rounded-md 
                                        px-2 py-2 text-sm`}
                                        >
                                            <TrashIcon className="w-4 h-4 mr-2" />
                                            Удалить
                                        </button>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}