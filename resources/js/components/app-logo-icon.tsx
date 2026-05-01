import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="
                    M11,8 H29 Q35,8 35,14 V22 H40 V26 H22 V36 H18 V26 H0 V22 H5 V14 Q5,8 11,8 Z
                    M10,12 H18 Q19,12 19,13 V19 Q19,20 18,20 H10 Q9,20 9,19 V13 Q9,12 10,12 Z
                    M22,12 H30 Q31,12 31,13 V19 Q31,20 30,20 H22 Q21,20 21,19 V13 Q21,12 22,12 Z
                "
            />
        </svg>
    );
}
