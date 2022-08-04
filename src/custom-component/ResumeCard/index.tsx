import React, { FC } from 'react';
import { Card } from 'antd';
import './index.css';
interface ResumeCardProps {
    text: string;
    title?: string;
}
const ResumeCard: FC<ResumeCardProps> = (props: ResumeCardProps) => {
    const { text, title } = props
    return (
        <Card className="ResumeCard" title={title} extra={<a href="#">More</a>}>
            <p>{text}</p>
        </Card>
    )
};

export default ResumeCard;
