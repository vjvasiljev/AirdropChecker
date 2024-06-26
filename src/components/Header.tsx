import * as React from "react";
import { useState, useEffect } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import EvStationIcon from "@mui/icons-material/EvStation";

import Badge from "@mui/joy/Badge";
import GasPrices from "../assets/GasPrices";
import { fetchGasPrices } from "../api/etherscan";

import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
  useWalletInfo,
} from "@web3modal/wagmi/react";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setThemeMode("dark");
            setMode("dark");
          } else {
            setThemeMode("light");
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [gasInfo, setGasInfo] = useState(null);

  useEffect(() => {
    fetchGasPrices().then((data) => {
      setGasInfo(data.result);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        p: 2,
        gap: 2,
        bgcolor: "background.surface",
        flexDirection: "row",
        alignItems: "center",
        gridColumn: "1 / -1",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
      component="header"
      className="Header"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton variant="soft" color="primary" size="sm">
            <ParaglidingIcon />
          </IconButton>
          <Typography level="title-lg">Drop Scan</Typography>
          {/* <ColorSchemeToggle sx={{ ml: "auto" }} /> */}
        </Box>
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Acme Co.</DialogTitle>
          <Box sx={{ px: 1 }}>{/* <Navigation /> */}</Box>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Wrap Eth
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Unwrap Eth
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Vote
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Check In
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Mint Random NFT
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Random Smart Contract
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        {/* <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
          }}
        >
          <SearchRoundedIcon />
        </IconButton> */}
        {/* <Tooltip title="Joy UI overview" variant="outlined">
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            component="a"
            href="/blog/first-look-at-joy/"
            sx={{ alignSelf: "center" }}
          >
            <BookRoundedIcon />
          </IconButton>
        </Tooltip> */}
        <Badge
          badgeContent={gasInfo ? gasInfo.ProposeGasPrice : "-"}
          max={99999}
          showZero
        >
          <IconButton
            size="md"
            color="neutral"
            // sx={{
            //   display: { xs: "none", sm: "inline-flex" },
            //   borderRadius: "50%",
            // }}
          >
            <EvStationIcon />
          </IconButton>
        </Badge>
        {/* <GasPrices /> */}
        {/* <IconButton
          size="md"
          color="neutral"
          // sx={{
          //   display: { xs: "none", sm: "inline-flex" },
          //   borderRadius: "50%",
          // }}
        >
          <LanguageRoundedIcon />
        </IconButton> */}
        <ColorSchemeToggle />

        <w3m-button />
        {/* <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Rick Sanchez
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    rick@email.com
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem component="a" href="/blog/first-look-at-joy/">
              First look at Joy UI
              <OpenInNewRoundedIcon />
            </MenuItem>
            <MenuItem
              component="a"
              href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
            >
              Sourcecode
              <OpenInNewRoundedIcon />
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown> */}
      </Box>
    </Box>
  );
}
