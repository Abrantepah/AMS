import { useLink } from "@refinedev/core";
import { Space, theme } from "antd";

// import { FinefoodsLogoIcon, FinefoodsLogoText } from "../../components";
import logo from '../assets/ams_logo.svg'
import logo_mobile from '../assets/knust-mobile.svg'
import { Logo } from "./styled";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { token } = theme.useToken();
  const Link = useLink();

  return (
    <Logo>
      <Link to="/">
        {collapsed ? (
          <img src={ logo_mobile } style={{width: "30px"}} alt="logo_mobile" />
        ) : (
          <Space size={12}>
            <img src={logo} alt="logo" style={{width: "130px"}}/>
          </Space>
        )}
      </Link>
    </Logo>
  );
};
