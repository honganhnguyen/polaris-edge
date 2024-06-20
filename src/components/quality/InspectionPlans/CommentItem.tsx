import React from "react";
import { Avatar, Button, Col, Divider, Flex, Form, Input, List, Row } from "antd";
import moment from "moment";
import avatar from "../../../assets/images/avatar-chat.png";
import { useTranslation } from "react-i18next";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

interface Message {
  id: number;
  sender: string;
  text?: string;
  link?: string;
  timestamp: string;
  avatar?: string;
}

const messages: Message[] = [
  {
    id: 1,
    sender: "Jack Smith",
    text: "Thanks for taking care of this inspection asap so we can close phare 3",
    timestamp: "2023-12-18T08:59:00",
    avatar: avatar,
  },
  {
    id: 2,
    sender: "",
    link: '@jack Smith',
    text: "noted we will do our best to complete the inspection in time",
    timestamp: "2023-12-18T09:12:00",
  },
  {
    id: 1,
    sender: "Jack Smith",
    text: "Yes, I have updated them",
    timestamp: "2023-12-18T09:15:00",
    avatar: avatar,
  },
  {
    id: 2,
    sender: "",
    link: '@jack Smith',
    text: "Thanks will keep you posted on the progress",
    timestamp: "2023-12-18T09:25:00",
  },
  {
    id: 2,
    sender: "",
    link: '@jack Smith',
    text: "the inspection is completed and I have added images to detail the work done",
    timestamp: "2023-12-25T09:12:00",
  },
  {
    id: 2,
    sender: "",
    timestamp: "2023-12-25T09:15:00",
  },
];

const groupByDate = (messages: Message[]) => {
  const grouped: Record<string, Message[]> = {};

  messages.forEach((message) => {
    const date = moment(message.timestamp).format("DD/MM/YYYY");
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });

  return grouped;
};

const hashStringToColor = (str: string): string => {
  const hash = str
    .split("")
    .reduce((acc: number, char: string) => char.charCodeAt(0) + acc, 0);
  const color = `#${(hash & 0x00ffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0")}`;
  return color;
};

const CommentItem: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {Object.entries(groupByDate(messages)).map(([date, messages]) => (
        <React.Fragment key={date}>
          <div className="date-header">{date}</div>
          <List<Message>
            dataSource={messages}
            renderItem={(message: Message) => (
              <List.Item
                key={message.id}
                className={message.id !== 2 ? "left-aligned" : "right-aligned"}
              >
                <div
                  className="message-container"
                  style={{
                    marginLeft:
                      message.id === 2 ||
                      moment(message.timestamp).format("DD MMM. HH:mm") ===
                        "18 dec. 09:12"
                        ? "auto"
                        : "0",
                    width: message.id === 1 ? "100%" : "auto",
                  }}
                >
                  {message.id === 2 && (
                    <div className="additional-date">
                      <span className="timestamp">
                        {moment(message.timestamp).format("DD MMM. HH:mm")}
                      </span>
                    </div>
                  )}
                  {message.sender && (
                    <List.Item.Meta
                      title={
                        <>
                          <span className="sender pr-3">{message.sender}</span>
                          <span className="timestamp">
                            {moment(message.timestamp).format("DD MMM. HH:mm")}
                          </span>{" "}
                        </>
                      }
                    />
                  )}
                  <Flex flex-wrap>
                    {message.avatar && <Avatar src={message.avatar} />}
                    <div
                      className="message-text"
                      style={{
                        borderRadius: "4px",
                        padding: "4px",
                        marginBottom: "5px",
                        width: "fit-content",
                        flexWrap: "wrap",
                        backgroundColor:
                          message.id === 1
                            ? "#0000000A"
                            : message.id === 2
                            ? "#f8fcff"
                            : "transparent",
                      }}
                    >
                      <span className="link">{message.link}</span> {message.text}
                    </div>
                  </Flex>
                </div>
              </List.Item>
            )}
          />
        </React.Fragment>
      ))}

      <div className="text-grey">
        {t("You changed the task status to ready for inspection")}
      </div>
      <Flex align="center" justify="flex-start" wrap="wrap" className="large-screen">
      <Divider className="customize-divider"></Divider>

      <div className="centered-input" style={{ width: '100%'}}>
        <Form className="form-comment">
          <Row justify="center" align='middle'>
            <Col span={23}>
              <TextArea placeholder={t('Enter message here')} autoSize={{ minRows: 1, maxRows: 4 }} />
            </Col>
            <Col span={1} style={{ textAlign: 'right' }}>
              <Button type="text"><SendOutlined /></Button>
            </Col>
          </Row>
        </Form>
      </div>
      </Flex>
    </>
  );
};

export default CommentItem;
