// import { UserOutlined, StarOutlined, HomeOutlined, PhoneOutlined, MailOutlined, WechatOutlined, QqOutlined, GithubOutlined, BarsOutlined, EnvironmentFilled, ScheduleOutlined } from '@ant-design/icons';
import {
    UserOutlined, StarOutlined, HomeOutlined, PhoneOutlined, MailOutlined, WechatOutlined,
    QqOutlined, GithubOutlined, BarsOutlined, EnvironmentFilled, ScheduleOutlined, EditOutlined
    , LineOutlined, SettingOutlined
} from '@ant-design/icons';

interface iconProps {
    name: string;
}

export const iconConfig: any = {
    "BarsOutlined": <BarsOutlined />,
    "UserOutlined": <UserOutlined />,
    "StarOutlined": <StarOutlined />,
    "HomeOutlined": <HomeOutlined />,
    "PhoneOutlined": <PhoneOutlined />,
    "MailOutlined": <MailOutlined />,
    "WechatOutlined": <WechatOutlined />,
    "QqOutlined": <QqOutlined />,
    "GithubOutlined": <GithubOutlined />,
    "EnvironmentFilled": <EnvironmentFilled />,
    "ScheduleOutlined": <ScheduleOutlined />,
    "EditOutlined": <EditOutlined />,
    "LineOutlined": <LineOutlined />,
    "SettingOutlined": <SettingOutlined />,

}

export const IconComponent = (props: iconProps) => {
    const { name } = props
    return iconConfig[name]
}
