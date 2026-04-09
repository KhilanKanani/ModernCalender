"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { StickyNote, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Monitor } from "lucide-react";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState({});
    const [input, setInput] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const savedNotes = localStorage.getItem("calendar-notes");

        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }

        setLoaded(true); // mark as loaded
    }, []);

    useEffect(() => {
        if (!loaded) return; // prevent first overwrite

        localStorage.setItem("calendar-notes", JSON.stringify(notes));
    }, [notes, loaded]);

    useEffect(() => {
        if (!selectedDate) return;

        const key = selectedDate.format("YYYY-MM-DD");
        setInput(notes[key] || "");
    }, [selectedDate]);

    const getKey = () => {
        if (startDate && endDate) {
            return `${startDate.format("YYYY-MM-DD")}_${endDate.format("YYYY-MM-DD")}`;
        }
        if (selectedDate) {
            return selectedDate.format("YYYY-MM-DD");
        }
        return null;
    };

    useEffect(() => {
        const key = getKey();
        if (!key) return;

        setInput(notes[key] || "");
    }, [selectedDate, startDate, endDate]);

    //  Generate Days
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    const days = [];
    for (let i = 0; i < startOfMonth.day(); i++) days.push(null);
    for (let d = 1; d <= endOfMonth.date(); d++) {
        days.push(startOfMonth.date(d));
    }

    const monthConfig = [
        {
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920",
            path: "M100,0 C10,10 150,120 0,100 L0,0 Z",
            color: "#60A5FA",
        },
        {
            image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1920",
            path: "M100,0 C100,100 80,80 0,100 L0,0 Z",
            color: "#F472B6",
        },
        {
            image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920",
            path: "M100,0 C65,10 100,90 0,100 L0,0 Z",
            color: "#4ADE80",
        },
        {
            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920",
            path: "M100,0 C55,10 55,120 0,100 L0,0 Z",
            color: "#38BDF8",
        },
        {
            image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1920",
            path: "M100,0 C70,50 80,90 0,100 L0,0 Z",
            color: "#FACC15",
        },
        {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
            path: "M100,0 C55,120 45,100 0,100 L0,0 Z",
            color: "#22D3EE",
        },
        {
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920",
            path: "M100,0 C50,30 100,70 0,100 L0,0 Z",
            color: "#818CF8",
        },
        {
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920",
            path: "M100,0 C60,100 100,60 0,100 L0,0 Z",
            color: "#FB7185",
        },
        {
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920",
            path: "M100,0 L50,100 L0,100 L0,0 Z",
            color: "#34D399",
        },
        {
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920",
            path: "M100,0 L70,90 L50,90 L0,100 L0,0 Z",
            color: "#FB923C",
        },
        {
            image: "https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=1920",
            path: "M100,0 C50,100 80,80 0,100 L0,0 Z",
            color: "#A78BFA",
        },
        {
            image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1920",
            path: "M100,0 C80,50 80,120 0,120 L0,0 Z",
            color: "#F87171",
        }
    ];

    const index = currentMonth.month();
    const current = monthConfig[index];
    const key = getKey();
    const currentMonthKey = currentMonth.format("MMMM YYYY");

    const groupedNotes = React.useMemo(() => {
        const grouped = {};

        Object.entries(notes).forEach(([key, value]) => {
            const isRange = key.includes("_");

            let baseDate;

            if (isRange) {
                const [start] = key.split("_");
                baseDate = dayjs(start);
            } else {
                baseDate = dayjs(key);
            }

            const monthKey = baseDate.format("MMMM YYYY");

            if (!grouped[monthKey]) {
                grouped[monthKey] = [];
            }

            grouped[monthKey].push({ key, value });
        });

        return grouped;
    }, [notes]);

    return (
        <div>

            <div className="lg:hidden min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900 px-6">

                {/* 🌈 SOFT GLOW */}
                <div
                    className="absolute w-[260px] h-[260px] rounded-full blur-[120px] opacity-20"
                    style={{ background: current.color }}
                />

                {/* 💻 ICON */}
                <div className="mt-6 z-10 text-gray-700">
                    <Monitor size={40} />
                </div>

                {/* 🧠 TEXT */}
                <div className="mt-5 text-center space-y-3 max-w-xs z-10">

                    <h2 className="text-sm font-semibold">
                        Optimized for Desktop Experience
                    </h2>

                    <p className="text-xs text-gray-600 leading-relaxed flex items-center justify-center gap-1">
                        This application is designed for larger screens to ensure smooth interaction and better usability.
                    </p>

                </div>

                {/* 💎 SUB TEXT (PRO TOUCH) */}
                <p className="mt-4 text-[11px] text-gray-500 text-center max-w-[220px]">
                    For full access to features like scheduling, note management, and advanced navigation, please use a desktop device.
                </p>

                {/* © FOOTER */}
                <div className="absolute bottom-6 text-center text-[10px] text-gray-500">
                    <p>© {new Date().getFullYear()} Kk's Pvt Ltd. All rights reserved</p>
                </div>

            </div>

            <div className="lg:block hidden h-screen font-serif flex flex-col md:flex-row overflow-hidden bg-transparent text-white">
                {/* ================= LEFT ================= */}
                <div className="relative w-full h-[300px] h-full">

                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full"
                    >
                        <defs>
                            <clipPath id="clip">
                                <path d={current.path} />
                            </clipPath>

                            <linearGradient id="glow" x1="0" x2="1">
                                <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* IMAGE */}
                        {/* IMAGE */}
                        <image
                            href={current.image}
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#clip)"
                            style={{ width: "100%", height: "100%" }}
                        />

                        {/* 🎨 COLOR OVERLAY */}
                        <rect
                            width="100%"
                            height="100%"
                            fill={current.color}
                            opacity="0.10"
                            clipPath="url(#clip)"
                        />

                        {/* GLOW */}
                        <motion.path
                            d={current.path}
                            fill="none"
                            stroke="url(#glow)"
                            strokeWidth="1.5"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </svg>

                    {/* OVERLAY TEXT */}
                    <div className="hidden md:block absolute  bottom-10 left-10">

                        {/* GLASS CARD */}
                        <div className="relative rounded-lg px-6 py-5 bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">

                            {/* CONTENT */}
                            <div className="flex flex-col gap-1">

                                {/* MONTH (MAIN FOCUS) */}
                                <h2
                                    className="text-2xl md:text-3xl font-bold uppercase tracking-[6px]"
                                    style={{
                                        color: current.color,
                                        textShadow: `0 0 15px ${current.color}88`
                                    }}
                                >
                                    {currentMonth.format("MMMM")}
                                </h2>

                                {/* YEAR (SECONDARY) */}
                                <p
                                    className="text-lg md:text-xl font-semibold text-white/80 tracking-wide"
                                >
                                    {currentMonth.format("YYYY")}
                                </p>

                                {/* ACCENT LINE */}
                                <div className="mt-2 flex items-center gap-2">
                                    <div
                                        className="h-[3px] w-16 rounded-full"
                                        style={{ background: current.color }}
                                    />
                                    <div className="h-[3px] w-6 bg-white/40 rounded-full" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="absolute w-[620px] top-30 right-10 flex flex-col items-center">

                    <div className="absolute -top-32.5 flex flex-col items-center z-20">
                        {/* TOP PIN */}
                        <div
                            style={{
                                background: ` ${current.color}`
                            }}
                            className="w-6 h-6 rounded-full bg-gray-600"></div>

                        <div
                            style={{
                                background: ` ${current.color}`
                            }}
                            className="w-1.5 absolute -left-10 top-0.5 rotate-45 h-35 -mt-1 bg-gray-600"></div>

                        <div
                            style={{
                                background: ` ${current.color}`
                            }}
                            className="w-1.5 absolute -right-10 top-0.5  rotate-135 h-35 -mt-1 bg-gray-600"></div>


                        <div
                            style={{
                                background: ` ${current.color}`
                            }}
                            className="w-6 h-6 absolute -left-23.5 top-25 rounded-full bg-gray-600"></div>

                        <div
                            style={{
                                background: ` ${current.color}`
                            }}
                            className="w-6 h-6 absolute -right-23.5 top-25 rounded-full bg-gray-600"></div>
                    </div>

                    {/* MAIN CARD */}
                    <div
                        style={{
                            background: `linear-gradient(110deg, ${current.color}, #000)`
                        }}
                        className="relative  mt-[-20px] rounded-lg w-full bg-gradient-to-br from-white via-gray-200 to-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.35)] p-6 flex flex-col backdrop-blur-xl "
                    >

                        <header className="mb-7">
                            <div className="relative flex items-center justify-center">

                                {/* LEFT BUTTON */}
                                <button
                                    onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
                                    title="Previous Month"
                                    style={{
                                        background: `linear-gradient(230deg, ${current.color}, #000)`
                                    }}
                                    className="absolute rounded-md -left-1 w-10 cursor-pointer h-10 flex items-center justify-center bg-gray-600 shadow-sm"
                                >
                                    ←
                                </button>

                                {/* CENTER TITLE */}
                                <h3 className="text-xl md:text-xl uppercase tracking-widest font-bold"
                                    style={{
                                        color: ` ${current.color}`
                                    }}
                                >
                                    {currentMonth.format("MMMM, YYYY")}
                                </h3>

                                {/* RIGHT BUTTON */}
                                <button
                                    onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
                                    title="Next Month"
                                    style={{
                                        background: ` ${current.color}`
                                    }}
                                    className="absolute rounded-md -right-1 cursor-pointer w-10  h-10 flex items-center justify-center bg-gray-600 shadow-sm"
                                >
                                    →
                                </button>
                            </div>
                        </header>

                        {/* DAYS HEADER */}
                        <div className="grid grid-cols-7 gap-3 mb-3 text-xs font-bold text-white uppercase tracking-wider relative z-10">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                <div key={d} className="text-center">{d}</div>
                            ))}
                        </div>

                        {/* GRID */}
                        <div className="grid grid-cols-7 gap-3 relative z-10">
                            {days.map((d, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        if (!d) return;

                                        // reset selected when doing range
                                        setSelectedDate(null);

                                        if (!startDate) {
                                            setStartDate(d);
                                            setEndDate(null);
                                            return;
                                        }

                                        if (startDate && !endDate) {
                                            if (d.isBefore(startDate)) {
                                                setStartDate(d);
                                            } else {
                                                setEndDate(d);
                                            }
                                            return;
                                        }

                                        // reset
                                        setStartDate(d);
                                        setEndDate(null);
                                    }}

                                    onDoubleClick={() => {
                                        if (!d) return;

                                        setStartDate(null);
                                        setEndDate(null);
                                        setSelectedDate(d);
                                    }}

                                    style={{
                                        background:
                                            d?.isSame(dayjs(), "day") &&
                                                !d?.isSame(startDate, "day") &&
                                                !d?.isSame(endDate, "day")
                                                ? `${current.color}`
                                                : undefined
                                    }}

                                    className={`
relative h-14 flex items-center justify-center rounded-xl cursor-pointer 
transition-all duration-300 font-semibold shadow-md ring ring-gray-300/20

${!d ? "opacity-0" : ""}

/* 🟢 START */
${startDate && d?.isSame(startDate, "day")
                                            ? "bg-green-500 text-white scale-110"
                                            : ""}

/* 🔵 END */
${endDate && d?.isSame(endDate, "day")
                                            ? "bg-blue-500 text-white scale-110"
                                            : ""}

/* 🔷 RANGE */
${startDate && endDate &&
                                            d?.isAfter(startDate) &&
                                            d?.isBefore(endDate)
                                            ? "bg-blue-200 text-black"
                                            : ""}

/* 🟣 SINGLE */
${selectedDate && d?.isSame(selectedDate, "day")
                                            ? "bg-gray-800 text-white scale-110"
                                            : ""}

/* ⚪ DEFAULT */
${!startDate && !endDate && !selectedDate
                                            ? "bg-white/10 hover:scale-105"
                                            : ""}
`}
                                >
                                    {d?.date()}

                                    {d && (() => {
                                        const dateStr = d.format("YYYY-MM-DD");

                                        const hasSingle = notes[dateStr];

                                        const rangeKey = Object.keys(notes).find(k => k.includes("_") && (() => {
                                            const [start, end] = k.split("_");
                                            return dateStr >= start && dateStr <= end;
                                        })());

                                        const isRangeStart = rangeKey && dateStr === rangeKey.split("_")[0];
                                        const isRangeEnd = rangeKey && dateStr === rangeKey.split("_")[1];
                                        const isRangeMiddle = rangeKey && !isRangeStart && !isRangeEnd;

                                        return (
                                            <>
                                                {/* 🔷 RANGE BACKGROUND LINE */}
                                                {/* 🔷 RANGE MIDDLE */}
                                                {isRangeMiddle && (
                                                    <div
                                                        className="absolute w-13 bottom-0 left-2.5 h-[2.5px] rounded-b-full"
                                                        style={{
                                                            background: "linear-gradient(135deg, #f97316, #ec4899)",
                                                            boxShadow: "0 0 5px rgba(34,197,94,0.8)"
                                                        }}
                                                    />
                                                )}

                                                {/* 🔵 RANGE START / END */}
                                                {(isRangeStart || isRangeEnd) && (
                                                    <div
                                                        className="absolute bottom-1 border w-2 h-2 rounded-full"
                                                        style={{
                                                            background: "linear-gradient(135deg, #f97316, #ec4899",
                                                            boxShadow: "0 0 10px rgba(34,197,94,0.8)"
                                                        }}
                                                    />
                                                )}

                                                {/* 🔵 SINGLE ONLY */}
                                                {hasSingle && !rangeKey && (
                                                    <div
                                                        className="absolute bottom-1.5 w-2 h-2 rounded-full border border-white"
                                                        style={{
                                                            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                                            boxShadow: "0 0 6px rgba(37,99,235,0.9)"
                                                        }}
                                                    />
                                                )}

                                                {/* ⭐ BOTH (SINGLE + RANGE OVERLAP) */}
                                                {hasSingle && rangeKey && (
                                                    <div className="absolute top-2.5 flex border items-center justify-center">

                                                        {/* sparkle */}
                                                        <span
                                                            className="absolute text-[12px]"
                                                        >
                                                            ✨
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* NOTE CARD */}
                    {(selectedDate || (startDate && endDate && !endDate.isSame(startDate, "day"))) && (
                        <motion.div
                            drag
                            dragMomentum={false}
                            onDragEnd={(e, info) => {
                                setPosition({
                                    x: position.x + info.offset.x,
                                    y: position.y + info.offset.y
                                });
                            }}
                            style={{
                                x: position.x,
                                y: position.y
                            }}
                            className="fixed top-69 right-170 z-50 cursor-grab active:cursor-grabbing"
                        >
                            {/* 💎 NOTE CARD */}
                            <div className="w-[400px] rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                                {/* 🎯 DRAG HEADER */}
                                <div
                                    className="px-5 py-3 text-sm font-semibold flex justify-between items-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${current.color}, #000)`
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <StickyNote size={18} />
                                        <span className="tracking-wide">Notes</span>
                                    </div>

                                    <span className="text-xs opacity-80 uppercase tracking-wide text-gray-300">
                                        {selectedDate && selectedDate.format("MMM D, YYYY")}
                                        {startDate && !endDate && startDate.format("MMM D, YYYY")}
                                        {startDate && endDate &&
                                            `${startDate.format("MMM D")} → ${endDate.format("MMM D, YYYY")}`}
                                    </span>
                                </div>

                                {/* ✍️ TEXTAREA */}
                                <div className="p-4">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Write something meaningful..."
                                        className="w-full h-40 font-serif p-4 rounded-md bg-white/90 text-gray-800 
  outline-none resize-none transition-all duration-300
  focus:scale-[1.02] focus:shadow-xl"
                                    />
                                </div>

                                {/* 🚀 ACTIONS */}
                                <div className="flex items-center gap-2 px-4 pb-4">
                                    {/* SAVE BUTTON */}
                                    <button
                                        onClick={() => {
                                            if (!key) {
                                                toast.error("Please select a date or range");
                                                return;
                                            }

                                            if (!input.trim()) {
                                                toast.warning("Note cannot be empty");
                                                return;
                                            }

                                            if (input.trim().length < 3) {
                                                toast.error("Note too short (min 3 chars)");
                                                return;
                                            }

                                            setNotes(prev => ({
                                                ...prev,
                                                [key]: input
                                            }));

                                            toast.success("Note saved successfully");

                                            setSelectedDate(null);
                                            setStartDate(null);
                                            setEndDate(null);
                                            setInput("");
                                        }}
                                        className="px-5 cursor-pointer py-1.5 rounded-md text-sm font-semibold text-white transition hover:scale-105"
                                        style={{
                                            background: current.color
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Save size={16} />
                                            Save
                                        </span>
                                    </button>


                                    {/* DELETE BUTTON (ONLY IF NOTE EXISTS) */}
                                    {key && notes[key] && (
                                        <button
                                            onClick={() => {
                                                if (!confirm("Delete this note?")) return;

                                                setNotes(prev => {
                                                    const updated = { ...prev };
                                                    delete updated[key];
                                                    return updated;
                                                });

                                                setInput("");
                                                setSelectedDate(null);
                                                setStartDate(null);
                                                setEndDate(null);
                                            }}
                                            className="px-4 py-1.5 rounded-md cursor-pointer text-sm font-semibold text-white 
    bg-red-500 hover:bg-red-600 transition hover:scale-105"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Trash2 size={16} />
                                                Delete
                                            </span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (input && input !== notes[key]) {
                                                if (!confirm("Discard changes?")) return;
                                            }

                                            setSelectedDate(null);
                                            setStartDate(null);
                                            setEndDate(null);
                                            setInput("");
                                        }}

                                        className="px-5 cursor-pointer py-1.5 rounded-md text-sm font-semibold text-gray-500 transition hover:scale-105"
                                        style={{
                                            background: "rgba(255,255,255,0.7)"
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <X size={16} />
                                            Close
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* NOTES LIST */}
                    <div
                        style={{
                            borderTopColor: current.color
                        }}
                        className="mt-6 pb-5 w-full max-h-[250px] overflow-y-auto border-t-2  space-y-4">
                        {/* DATA EXISTS */}
                        {groupedNotes?.[currentMonthKey] && (
                            <div className="space-y-3">

                                {/*  HEADER */}
                                <div
                                    className="px-4 py-2 mt-3 uppercase rounded-lg text-sm font-bold tracking-widest backdrop-blur-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${current.color}, #000)`,
                                    }}
                                >
                                    {currentMonthKey}
                                </div>

                                {/* 📦 NOTES */}
                                <div className="space-y-3">
                                    {groupedNotes[currentMonthKey].map(({ key, value }) => {
                                        const isRange = key.includes("_");

                                        let label = "";

                                        if (isRange) {
                                            const [start, end] = key.split("_");
                                            label = `${dayjs(start).format("MMM DD")} → ${dayjs(end).format("MMM DD")}`;
                                        } else {
                                            label = dayjs(key).format("MMM DD, YYYY");
                                        }

                                        return (
                                            <div
                                                key={key}
                                                className={`p-4 rounded-md backdrop-blur-xl border border-gray-300/50`}
                                            >
                                                {/* 📅 DATE */}
                                                <p
                                                    className="text-xs uppercase font-semibold mb-1"
                                                    style={{
                                                        color: current.color,
                                                    }}
                                                >
                                                    {label}
                                                </p>

                                                {/* 📝 NOTE */}
                                                <p className="text-sm text-black/90 bg-transparent font-serif leading-relaxed">
                                                    {value}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div>
    );
}