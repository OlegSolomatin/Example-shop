import React from 'react'

export default function Button({text, classNameProps, type}) {

    return (
        <button type={type} className={classNameProps}>
            {text}
        </button>
    )

}