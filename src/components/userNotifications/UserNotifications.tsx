import { useState, useEffect } from "react";
import { Box, Button, Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { translate } from "@i18n";
import user from "@assets/user.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import moment from "moment";
import "animate.css";
import "./UserNotifications.scss";

interface IUserNotificationsProps {
  cbHandleCloseNotification: () => void;
}

const mockData = [
  {
    id: 1,
    name: "Тех поддержка",
    text: "На вашем счету недостаточно средств, пожалуйста, пополните баланс",
    date: "2023-12-01 10:00",
    is_read: false,
  },
  {
    id: 2,
    name: "Тех поддержка",
    text: "Напоминаем, через 1 час у вас запланировано занятие с преподавателем Jeff Morrison",
    date: "2023-12-01 10:00",
    is_read: true,
  },
  {
    id: 3,
    name: "Тех поддержка",
    text: "Ученик Кирилл Афанасьев забронировал урок с Вами",
    date: "2023-12-01 10:00",
    is_read: false,
  },
  { id: 4, name: "Тех поддержка", text: "Ваш баланс пополнен на 40$", date: "2023-12-01 10:00", is_read: true },
  {
    id: 5,
    name: "Тех поддержка",
    text: "Напоминаем, через 1 час у вас запланировано занятие с преподавателем Jeff Morrison",
    date: "2023-12-01 10:00",
    is_read: true,
  },
  {
    id: 6,
    name: "Тех поддержка",
    text: "Напоминаем, через 1 час у вас запланировано занятие с преподавателем Jeff Morrison",
    date: "2023-12-01 10:00",
    is_read: false,
  },
  { id: 7, name: "Тех поддержка", text: "Ваш баланс пополнен на 10$", date: "2023-12-01 10:00", is_read: true },
  {
    id: 8,
    name: "Тех поддержка",
    text: "Напоминаем, через 1 час у вас запланировано занятие с преподавателем Jeff Morrison",
    date: "2023-12-01 10:00",
    is_read: true,
  },
  {
    id: 9,
    name: "Тех поддержка",
    text: "Напоминаем, через 1 час у вас запланировано занятие с преподавателем Jeff Morrison",
    date: "2023-12-01 10:00",
    is_read: true,
  },
  {
    id: 10,
    name: "Тех поддержка",
    text: "Ученик Кирилл Афанасьев забронировал урок с Вами",
    date: "2023-12-01 10:00",
    is_read: true,
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#20DC55",
    color: "#20DC55",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    right: "20px",
    height: "10px",
    width: "10px",

    "&::after": {
      position: "absolute",
      top: "-1px",
      left: "-0.5px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserNotifications = ({ cbHandleCloseNotification }: IUserNotificationsProps) => {
  const { t } = translate("translate", { keyPrefix: "userNotifications" });

  const [isShowAllNotifications, setIsShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockData.slice(0, 4));

  useEffect(() => {
    isShowAllNotifications && setNotifications(mockData);
    !isShowAllNotifications && setNotifications(mockData.slice(0, 4));
    // eslint-disable-next-line
  }, [isShowAllNotifications]);

  const handleCloseNotifications = () => {
    cbHandleCloseNotification();
  };

  const handleMarkNotification = () => {
    console.log("mark as read, server request");
    const newData = mockData.map((el) => {
      return { ...el, is_read: true };
    });
    setNotifications(newData);
  };

  const handleSeeAll = () => {
    setIsShowAllNotifications(!isShowAllNotifications);
  };

  return (
    <Box className="userNotificationsBox animate__animated animate__slideInRight">
      <Box className="firstRowNotifications">
        <p>{t("notifications")}</p>
        <Button type="button" onClick={handleCloseNotifications}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <Box className="notificationsContentBox">
        {notifications.length === 0 && <p className="emptyNotifications">{t("emptyNotifications")}</p>}
        {notifications.length !== 0 &&
          notifications.map((el, ind) => (
            <Box key={ind} className="itemNotificationBox">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="userBadge"
              >
                <Avatar alt="user" src={user} className="userAvatar" />
              </StyledBadge>
              <Box className="notificationInformationBox">
                <Box className="nameReadBox">
                  <p className="userName">{el.name}</p>
                  {!el.is_read && <Box className="isReadBox" />}
                </Box>
                <p className="notificationText">{el.text}</p>
                <p className="date">{moment(el.date).format("MMM, DD, HH:mm")}</p>
              </Box>
            </Box>
          ))}
      </Box>
      {notifications.length !== 0 && (
        <Box className="lastRowNotifications">
          <Button type="button" onClick={handleMarkNotification}>
            {t("markAsRead")}
          </Button>
          <Button type="button" onClick={handleSeeAll}>
            {t(isShowAllNotifications ? "collapse" : "seeAll")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserNotifications;
