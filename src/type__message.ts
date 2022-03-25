import { TacticsKey } from ".";

export interface SrcDst {
    type: "SrcDst";
    src: AbsoluteCoord;
    dest: AbsoluteCoord;
    water_entry_ciurl?: Ciurl;
}

export interface SrcStepDstFinite {
    type: "SrcStepDstFinite";
    src: AbsoluteCoord;
    step: AbsoluteCoord;
    dest: AbsoluteCoord;
    water_entry_ciurl?: Ciurl;
}

interface MoveToBePolledWithPotentialWaterEntry {
    type: "NonTamMove";
    data: SrcDst | SrcStepDstFinite;
}

export type MoveToBePolled = MoveToBePolledWithPotentialWaterEntry | {
    type: "NonTamMove",
    data: {
        type: "FromHand";
        color: Color;
        prof: Profession;
        dest: AbsoluteCoord;
    },
} | {
    type: "TamMove"
    stepStyle: "NoStep";
    src: AbsoluteCoord;
    firstDest: AbsoluteCoord;
    secondDest: AbsoluteCoord;
} | {
    type: "TamMove"
    stepStyle: "StepsDuringFormer" | "StepsDuringLatter";
    src: AbsoluteCoord;
    step: AbsoluteCoord;
    firstDest: AbsoluteCoord;
    secondDest: AbsoluteCoord;
} | {
    type: "InfAfterStep";
    src: AbsoluteCoord;
    step: AbsoluteCoord;
    plannedDirection: AbsoluteCoord;
    stepping_ciurl: Ciurl;
    finalResult: null /* not yet known */ | {
        dest: AbsoluteCoord;
        water_entry_ciurl?: Ciurl;
        thwarted_by_failing_water_entry_ciurl: Ciurl | null
    };
};

export enum Color {
    Kok1, // Red, 赤
    Huok2, // Black, 黒
}

export enum Profession {
    Nuak1, // Vessel, 船, felkana
    Kauk2, // Pawn, 兵, elmer
    Gua2, // Rook, 弓, gustuer
    Kaun1, // Bishop, 車, vadyrd
    Dau2, // Tiger, 虎, stistyst
    Maun1, // Horse, 馬, dodor
    Kua2, // Clerk, 筆, kua
    Tuk2, // Shaman, 巫, terlsk
    Uai1, // General, 将, varxle
    Io, // King, 王, ales
}

export type AbsoluteRow = "A" | "E" | "I" | "U" | "O" | "Y" | "AI" | "AU" | "IA";

export type AbsoluteColumn = "K" | "L" | "N" | "T" | "Z" | "X" | "C" | "M" | "P";

export type AbsoluteCoord = [AbsoluteRow, AbsoluteColumn];

export interface NormalNonTamMove {
    type: "NonTamMove";
    data: {
        type: "FromHand";
        color: Color;
        prof: Profession;
        dest: AbsoluteCoord;
    } | {
        type: "SrcDst";
        src: AbsoluteCoord;
        dest: AbsoluteCoord;
    } | {
        type: "SrcStepDstFinite";
        src: AbsoluteCoord;
        step: AbsoluteCoord;
        dest: AbsoluteCoord;
    };
}

export type TamMove = {
    type: "TamMove"
    stepStyle: "NoStep";
    src: AbsoluteCoord;
    firstDest: AbsoluteCoord;
    secondDest: AbsoluteCoord;
} | {
    type: "TamMove"
    stepStyle: "StepsDuringFormer" | "StepsDuringLatter";
    src: AbsoluteCoord;
    step: AbsoluteCoord;
    firstDest: AbsoluteCoord;
    secondDest: AbsoluteCoord;
};

export type NormalMove = NormalNonTamMove | TamMove;

export interface InfAfterStep {
    type: "InfAfterStep";
    src: AbsoluteCoord;
    step: AbsoluteCoord;
    plannedDirection: AbsoluteCoord;
}

export interface AfterHalfAcceptance {
    type: "AfterHalfAcceptance";
    dest: AbsoluteCoord | null;
    /* null: hands over the turn to the opponent */
}

export type Ciurl = [boolean, boolean, boolean, boolean, boolean];

export type WhoGoesFirst = {
    process: [Ciurl, Ciurl][]
    result: boolean,
}

export type RetTyMok = { type: "Err", why_illegal: string } | { type: "Ok" };

export type RetTaXot = { type: "Err", why_illegal: string } | { type: "Ok", is_first_move_my_move: WhoGoesFirst | null };

export type RetInfAfterStep = { type: "Err", why_illegal: string } | { type: "Ok", ciurl: Ciurl };

export type RetNormalMove =
    | { type: "Err", why_illegal: string }
    | { type: "WithWaterEntry", ciurl: Ciurl }
    | { type: "WithoutWaterEntry" };

export type RetAfterHalfAcceptance =
    | { type: "Err", why_illegal: string }
    | { type: "WithWaterEntry", ciurl: Ciurl }
    | { type: "WithoutWaterEntry" };

export type RetRandomEntry = {
    type: "InWaitingList";
    session_token: string;
} | {
    type: "LetTheGameBegin";
    session_token: string;
    is_first_move_my_move: WhoGoesFirst;
    is_IA_down_for_me: boolean
}

export type RetVsCpuEntry = {
    type: "LetTheGameBegin";
    session_token: string;
    is_first_move_my_move: WhoGoesFirst;
    is_IA_down_for_me: boolean;
}

export type RetRandomPoll = {
    type: "Err",
    why_illegal: string,
} | {
    type: "Ok",
    ret: RetRandomEntry,
};

export type RetRandomCancel = {
    type: "Err";
    why_illegal: string
} | {
    type: "Ok",
    cancellable: boolean,
};

export type RetWhetherTyMokPoll = {
    type: "TyMok"
} | {
    type: "TaXot", is_first_move_my_move: WhoGoesFirst | null
} | {
    type: "NotYetDetermined"
} | { type: "Err", why_illegal: string };

export type RetMainPoll = { type: "MoveMade", message?: TacticsKey, content: MoveToBePolled }
    | { type: "NotYetDetermined" }
    | { type: "Err", why_illegal: string };

export type RetInfPoll = { type: "MoveMade", content: MoveToBePolled } |
{ type: "NotYetDetermined" } |
{ type: "Err", why_illegal: string };

export declare type RetFriendJoinRoom = {
    type: "Err";
    why_illegal: string;
} | {
    type: "Ok";
    ret: {
        type: "LetTheGameBegin";
        session_token: string;
        is_first_move_my_move: WhoGoesFirst;
        is_IA_down_for_me: boolean;
    };
};

export declare type RetFriendMakeRoom = {
    type: "RoomMade";
    session_token: string;
	room_id: string;
	room_key: string;
}

export declare type RetFriendPoll = {
    type: "Err";
    why_illegal: string;
} | {
    type: "Ok";
    ret: {
        type: "StillAloneInTheRoom";
    } | {
        type: "LetTheGameBegin";
        is_first_move_my_move: WhoGoesFirst;
        is_IA_down_for_me: boolean;
    };
};

export declare type RetFriendDeleteRoom = {
    type: "Err";
    why_illegal: string;
} | {
    type: "Ok";
    ret: "RoomIsRevoked";
};
