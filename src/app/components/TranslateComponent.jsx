import { use } from 'passport'
import React, { useEffect, useRef } from 'react'

const TranslateComponent = () => {

    const googleTranslateRef = useRef(null);

    useEffect(() => {
        let intervalId;

        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'hi,bn,te,mr,ta,ur,gu,ml,kn,pa,or,as,ma,kok,sd,ne,bho,mwr,sat,doi,ks,mni,tcy,sa,hif,mai,raj',
                         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    googleTranslateRef.current
                );
            }
        };

        intervalId = setInterval(checkGoogleTranslate, 100);

    }, []);

return (
    
        <div>
            <div ref={googleTranslateRef}  className='flex flex-row justify-center' > 
            </div>
        </div>
    
)
}

export default TranslateComponent