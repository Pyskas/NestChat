import React, { useEffect, useRef } from "react";

const NewMessageInput = ({ value, onChange, onSend }) => {
    const input = useRef();

    const onInputKeyDown = (ev) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            onSend();
        }
    };

    const onChangeEvent = (ev) => {
        setTimeout(() => {
            adjustHeight();
        }, 10);
        onChange(ev);
    };

    const adjustHeight = () => {
        setTimeout(() => {
            input.current.style.height = "auto";
            input.current.style.height = input.current.scrollHeight + 1 + "px";
        }, 100);
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea 
        ref={input}
        value={value}
        rows="1"
        placeholder="Напишите сообщение"
        onKeyDown={onInputKeyDown}
        onChange={(ev) => onChangeEvent(ev)}
        className="w-full overflow-y-auto rounded-r-none resize-none input input-bordered max-h-40"
        ></textarea>
    );
};

export default NewMessageInput;