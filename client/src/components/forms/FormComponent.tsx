import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { SocketEvent } from "@/types/socket";
import { USER_STATUS } from "@/types/user";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "@/assets/logo.svg";
import { motion } from "framer-motion";

const FormComponent = () => {
    const location = useLocation();
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext();
    const { socket } = useSocket();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() });
        toast.success("Created a new Room Id");
        usernameRef.current?.focus();
    };

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const validateForm = () => {
        if (currentUser.username.length === 0) {
            toast.error("Enter your username");
            return false;
        } else if (currentUser.roomId.length === 0) {
            toast.error("Enter a room id");
            return false;
        } else if (currentUser.roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long");
            return false;
        } else if (currentUser.username.length < 3) {
            toast.error("Username must be at least 3 characters long");
            return false;
        }
        return true;
    };

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === USER_STATUS.ATTEMPTING_JOIN) return;
        if (!validateForm()) return;
        toast.loading("Joining room...");
        setStatus(USER_STATUS.ATTEMPTING_JOIN);
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser);
    };

    useEffect(() => {
        if (currentUser.roomId.length > 0) return;
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId });
            if (currentUser.username.length === 0) {
                toast.success("Enter your username");
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser]);

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect();
            return;
        }

        const isRedirect = sessionStorage.getItem("redirect") || false;

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username;
            sessionStorage.setItem("redirect", "true");
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            });
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect");
            setStatus(USER_STATUS.DISCONNECTED);
            socket.disconnect();
            socket.connect();
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status]);

    const variants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: "easeOut"
            }
        }),
    };

    return (
        <motion.div
            className="flex w-full max-w-[500px] flex-col items-center justify-center gap-6 p-4 sm:p-8 bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-400/30"
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <motion.div
                className="w-full max-w-[250px] mb-6"
                variants={variants}
                whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                    filter: "drop-shadow(0 0 10px rgba(124,58,237,0.8))"
                }}
            >
                <img src={logo} alt="Logo" className="w-full" />
            </motion.div>

            <motion.form
                onSubmit={joinRoom}
                className="flex w-full flex-col gap-5"
                variants={variants}
            >
                {["roomId", "username"].map((field, idx) => (
                    <motion.div key={field} custom={idx} variants={variants}>
                        <input
                            type="text"
                            name={field}
                            placeholder={field === "roomId" ? "Enter Room ID" : "Your Username"}
                            value={currentUser[field]}
                            onChange={handleInputChanges}
                            ref={field === "username" ? usernameRef : null}
                            className="w-full rounded-xl border border-purple-500/20 bg-white/10 px-5 py-4 text-lg text-white placeholder-gray-400 shadow-inner backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                        />
                    </motion.div>
                ))}

                <motion.button
                    type="submit"
                    className="relative mt-4 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-md hover:shadow-purple-700 transition-all duration-300 overflow-hidden"
                    variants={variants}
                    whileHover={{
                        scale: 1.03,
                        boxShadow: "0 12px 25px rgba(168,85,247,0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={status === USER_STATUS.ATTEMPTING_JOIN}
                >
                    {status === USER_STATUS.ATTEMPTING_JOIN ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span>Joining...</span>
                        </div>
                    ) : (
                        "Join Room"
                    )}
                </motion.button>
            </motion.form>

            <motion.button
                onClick={createNewRoomId}
                className="mt-2 text-base font-medium text-violet-400 hover:text-violet-300 transition-all"
                variants={variants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                ✨ Generate Unique Room ID
            </motion.button>

            <motion.div
                className="text-sm text-gray-400 mt-4 text-center"
                variants={variants}
            >
                Enter a room ID or create a new one to start collaborating.
            </motion.div>
        </motion.div>
    );
};

export default FormComponent;
