/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOnline } from "@/shared/hooks";
import { UserAvatar } from "@/shared/ui";
import { useNavigate } from "react-router-dom";

interface IDirectProps {
  name: string;
  message?: string;
  time?: string;
  id: string;
  isActive?: boolean;
  userId?: string;
}

const DirectItem: React.FC<IDirectProps> = ({ name, message, id, isActive, userId='' }) => {
  const navigate = useNavigate();
  const isOnline = useOnline(userId);

  return (
    <li
      className={`relative flex flex-auto w-full items-center py-3 px-5 hover:bg-slate-500 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-slate-600' : 'bg-transparent'}`}
      onClick={() => navigate(`/directs/${id}`)}
    >
      <div className="absolute">
      <UserAvatar
        name={name}
        isOnline={isOnline}
      />
      </div>
      <div className="flex flex-col justify-between pl-11 overflow-hidden">
        <p className="text-white font-medium text-lg">
          {name}
        </p>
        {
          message &&
          <p className=" text-gray-300 truncate">
            {message}
          </p>
        }
      </div>
    </li>
  );
};

export default DirectItem;
