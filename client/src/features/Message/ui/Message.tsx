/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";

import { TypingDots } from "@/shared/ui";
import MessageSeen from '@/shared/assets/icons/messageSeen.svg?react';

interface IMessageProps {
  item?: Message;
  myId?: string;
  onVisibilityChange?: (item: any, isVisible: boolean) => void;
}

export const Message: FC<IMessageProps> = ({ item, myId, onVisibilityChange }) => {
  const messageRef = useRef(null);
  const [isSeen, setIsSeen] = useState(item?.isSeen);

  useEffect(() => {
    setIsSeen(item?.isSeen)
  }, [item?.isSeen]);

  const formatTime = (value: string) => {
    const date: Date = new Date(value);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const getMessageStyles = (isWrapper: boolean) => {
    const baseWrap = 'transition-height flex h-fit w-full';
    const baseContent = 'px-6 py-3 rounded-3xl h-fit w-fit';
    const isMyMessage = item?.senderId === myId;
    if ((!isWrapper && !item) || (!isWrapper && !isMyMessage)) return baseContent + ' bg-slate-600';
    if (!isWrapper && isMyMessage) return baseContent + ' bg-blue-600';
    if (isWrapper && !item) return baseWrap;
    if (isWrapper && isMyMessage) return baseWrap + ' justify-end';
    return baseWrap;
  }

  useEffect(() => {
    if (item?._id && onVisibilityChange && !isSeen) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSeen(true);
          onVisibilityChange(item?._id, entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (messageRef.current) {
        observer.observe(messageRef.current);
      }
      const ref = messageRef.current;
      return () => {
        if (ref) observer.unobserve(ref);
      };
    }
  }, [item, onVisibilityChange, isSeen]);

  if (!item) return(
    <li className={getMessageStyles(true)}>
      <div className={getMessageStyles(false)}>
        <TypingDots />
      </div>
    </li>
  );

  return (
    <li
      className={getMessageStyles(true)}
      ref={item?.senderId !== myId ? messageRef : null}
    >
      <div className={getMessageStyles(false)}>
        <p className="text-gray-100 text-lg">
          {item?.message}
        </p>
        <div className="flex gap-2 items-center justify-end">
          <p className={`text-gray-400 text-xs flex justify-${item?.senderId === myId ? 'end' : 'start'}`}>
            {formatTime(item?.createdAt || '')}
          </p>
          {
            item?.senderId === myId ?
            <MessageSeen className={`message-icon ${item?.isSeen ? 'seen' : ''}`}/>
            : null
          }
        </div>
      </div>
    </li>
  );
};
