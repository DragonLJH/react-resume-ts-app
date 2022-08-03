import React, { FC } from 'react';
import { Image } from 'antd';
import './index.css';
interface ResumeImgProps {
    src: string;
}
const ResumeImg: FC<ResumeImgProps> = (props: ResumeImgProps) => {
    const { src } = props
    return (
        <Image rootClassName="rootResumeImg" className="ResumeImg" src={src} fallback="http://150.158.96.29:8082/commom-img/error.png" preview={false}  />
    )
};

export default ResumeImg;
