import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import axios from "axios";
import GroupDescriptionPopover from "./GroupDescriptionPopover";
import GroupUsersPopover from "./GroupUsersPopover";
import { useEventBus } from "@/EventBus";

const ConversationHeader = ({ selectedConversation }) => {
    const authUser = usePage().props.auth.user;
    const {emit} = useEventBus();
    
    const onDeleteGroup = () => {
        if(window.confirm("Вы уверены что хотите удалить эту группу?")) {
            return;
        }

        axios.delete(route("group.destroy", selectedConversation.id))
        .then((res) => {
            console.log(res)
            emit("toast.show", res.data.message);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            {selectedConversation && (
                <div className="flex items-center justify-between p-3 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("dashboard")}
                            className="inline-block sm:hidden"
                        >
                            <ArrowLeftIcon className="w-6" />
                        </Link>
                        {selectedConversation.is_user && (
                            <UserAvatar user={selectedConversation} />
                        )}
                        {selectedConversation.is_group && <GroupAvatar />}
                        <div>
                            <h3>{selectedConversation.name}</h3>
                            {selectedConversation.is_group && (
                                <p className="text-xs text-gray-500">
                                    {selectedConversation.users.length} участников
                                </p>
                            )}
                        </div>
                    </div>
                    {selectedConversation.is_group && (
                        <div className="flex gap-3">
                            <GroupDescriptionPopover
                                description={selectedConversation.description}
                            />
                            <GroupUsersPopover
                                users={selectedConversation.users}
                            />
                            {selectedConversation.owner_id == authUser.id && (
                                <>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Редактировать группу"
                                    >
                                        <button
                                        onClick={(ev) =>
                                            emit(
                                                "GroupModal.show",
                                                selectedConversation
                                            )
                                        }
                                            className="text-gray-400 hover:text-gray-200"
                                        >
                                            <PencilSquareIcon className="w-4" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Удалить группу"
                                    >
                                        <button
                                            onClick={onDeleteGroup}
                                            className="text-gray-400 hover:text-gray-200"
                                        >
                                            <TrashIcon className="w-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}  
        </>
    );
};

export default ConversationHeader;