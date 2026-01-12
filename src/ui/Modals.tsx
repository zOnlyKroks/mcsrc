import JavadocModal from "../javadoc/JavadocModal";
import LoginModal from "../javadoc/api/LoginModal";
import AboutModal from "./AboutModal";
import IndexProgressModal from "./IndexProgressModal";
import ProgressModal from "./ProgressModal";
import SettingsModal from "./SettingsModal";
import InheritanceModal from "./inheritance/InheritanceModal";

const Modals = () => {
    return (
        <>
            <ProgressModal />
            <IndexProgressModal />
            <JavadocModal />
            <LoginModal />
            <InheritanceModal />
            <AboutModal />
            <SettingsModal />
        </>
    );
};

export default Modals;
