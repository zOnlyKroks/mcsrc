import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer, Flex, Splitter, theme } from "antd";
import { useState } from "react";
import { isThin } from "../logic/Browser.ts";
import { diffView } from "../logic/Diff.ts";
import { enableTabs } from "../logic/Settings.ts";
import { useObservable } from "../utils/UseObservable.ts";
import Code from "./Code.tsx";
import { FilepathHeader } from "./FilepathHeader.tsx";
import { HeaderBody } from "./Header.tsx";
import Modals from "./Modals.tsx";
import SideBar from "./SideBar.tsx";
import { TabsComponent } from "./TabsComponent.tsx";
import DiffView from "./diff/DiffView.tsx";

const App = () => {
    const isSmall = useObservable(isThin);
    const enableDiff = useObservable(diffView);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                components: {
                    Card: {
                        bodyPadding: 4,
                    },
                    Tabs: {
                        horizontalMargin: "0",
                    },
                },
            }}
        >
            <Modals />
            {enableDiff ? <DiffView /> : isSmall ? <MobileApp /> : <LargeApp />}
        </ConfigProvider>
    );
};

const LargeApp = () => {
    const [sizes, setSizes] = useState<(number | string)[]>(["25%", "75%"]);
    const tabsEnabled = useObservable(enableTabs.observable);

    return (
        <Splitter onResize={setSizes}>
            <Splitter.Panel collapsible defaultSize="200px" min="5%" size={sizes[0]} style={{ height: "100vh" }}>
                <SideBar />
            </Splitter.Panel>
            <Splitter.Panel size={sizes[1]}>
                {tabsEnabled && <TabsComponent />}
                <FilepathHeader />
                <Code />
            </Splitter.Panel>
        </Splitter>
    );
};

const MobileApp = () => {
    const [open, setOpen] = useState(false);
    const tabsEnabled = useObservable(enableTabs.observable);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Flex vertical={true}>
            <Drawer
                onClose={onClose}
                open={open}
                placement="left"
                styles={{ body: { padding: 0 } }}
                extra={<HeaderBody />}
            >
                <SideBar />
            </Drawer>
            <Flex>
                <Button
                    size="large"
                    type="primary"
                    onClick={showDrawer}
                    icon={<MenuFoldOutlined />}
                    style={{
                        flexShrink: 0,
                        margin: ".5rem .5rem .5rem 1.5rem",
                    }}
                />
                {tabsEnabled && (
                    <span style={{ overflowX: "auto" }}>
                        {" "}
                        <TabsComponent />{" "}
                    </span>
                )}
            </Flex>
            <FilepathHeader />
            <Code />
        </Flex>
    );
};

export default App;
