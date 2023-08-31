NavigationBar.jsx;
import { useState, useEffect } from "react";
import "./NavigationBar.css";
import KalaburagiAirport from "../assets/svgs/KalaburagiAirport.svg";
import NavLink from "./NavLink";
import Dashboard from "../assets/svgs/Dashboard.svg";
import CitySideIcon from "../assets/svgs/CitySide.svg";
import TerminalSideIcon from "../assets/svgs/TerminalSide.svg";
import AirSideIcon from "../assets/svgs/AirSide.svg";
import MessageIcon from "../assets/svgs/Messages.svg";
import UserManagementIcon from "../assets/svgs/UserManagement.svg";
import ElectricityDeptIcon from "../assets/svgs/ElectricityDept.svg";
import CircularIcon from "../assets/svgs/Circulars.svg";
import ContentIcon from "../assets/svgs/Content.svg";
import SettingsIcon from "../assets/svgs/Settings.svg";
import UserIcon from "../assets/svgs/UserDash.svg";
import Astra from "../assets/svgs/astra-logo.png";

const NavigationBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div style={{ margin: "2rem" }}></div>
      <div className="left-navigation-bar">
        <div className="left-header">
          {isMobile ? (
            <img src={Astra} alt="Logo" className="logo" />
          ) : (
            <>
              <img src={Astra} alt="Logo" className="logo" />
              <p className="management-system">Astra</p>
            </>
          )}
        </div>
        <div className="user-settings-container">
          <div className="left-sections">
            <div className="sub-section">
              <p>MAIN</p>
              <NavLink
                to="/"
                name={isMobile ? "" : "Dashboard"}
                iconSrc={Dashboard}
              />
              <NavLink
                to="/city-side"
                name={isMobile ? "" : "City Side"}
                iconSrc={CitySideIcon}
              />
              <NavLink
                to="/terminal-side"
                name={isMobile ? "" : "Terminal Side"}
                iconSrc={TerminalSideIcon}
              />
              <NavLink
                to="/air-side"
                name={isMobile ? "" : "Air Side"}
                iconSrc={AirSideIcon}
              />
            </div>
            <div className="sub-section">
              <p>OTHERS</p>
            </div>
            <div className="sub-section">
              <p>MISC</p>
              <NavLink
                to="/circulars"
                name={isMobile ? "" : "Circulars"}
                iconSrc={CircularIcon}
              />
              <NavLink
                to="/content"
                name={isMobile ? "" : "Content/Blog"}
                iconSrc={ContentIcon}
              />
            </div>
          </div>
          <div className="settings">
            <div
              style={{
                backgroundColor: "var(--color-lightgray2)",
                borderRadius: "8px",
              }}
            >
              <NavLink
                to="/settings"
                name={isMobile ? "" : "Settings"}
                iconSrc={SettingsIcon}
              />
            </div>
            <div className="user-profile">
              <NavLink
                to="/user"
                name={isMobile ? "" : "Random Name"}
                iconSrc={UserIcon}
                style={
                  isMobile ? { color: "var(--color-blue)!important" } : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
