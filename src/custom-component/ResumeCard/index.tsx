import React, { FC } from 'react';
import { Card } from 'antd';
import ResumeText from "../ResumeText"
import { IconComponent } from "../../utils/icon-config";
import './index.css';

const { Meta } = Card
interface ResumeCardProps {
    text?: string;
    title?: any;
    cover?: any;
    avatar?: any;
    icon?: any;
    secondaryTitle?: string;
    description?: any;
}
const ResumeCard: FC<ResumeCardProps> = (props: ResumeCardProps) => {
    const { text, title, cover, avatar, description, secondaryTitle, icon } = props
    const mainHead: ResumeCardProps = {}
    const metaHead: ResumeCardProps = {}

    if (title) mainHead['title'] = <ResumeText {...{ text: title, icon }} />
    if (cover) mainHead['cover'] = <img src={cover} />
    if (avatar) metaHead['avatar'] = <IconComponent name={avatar ?? ''} />
    if (description) metaHead['description'] = <p><ResumeText text={description} /></p>

    return (
        <Card
            headStyle={{ height: "20%" }}
            bodyStyle={{ height: "80%" }}
            className="ResumeCard" {...mainHead}
        >
            {text ? <p><ResumeText {...{ text }} /></p> : ""}
            <Meta
                {...metaHead}
                title={<ResumeText {...{ text: secondaryTitle ?? "" }} />}
            />
        </Card>
    )
};

export default ResumeCard;
