
    
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
        finalResult: null /* not yet known */| {
            dest: AbsoluteCoord;
            water_entry_ciurl?: Ciurl;
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

    export type Ret_InfAfterStep = {
        legal: false,
        whyIllegal: string,
    } | {
        legal: true,
        ciurl: Ciurl,
    };

    export type WhetherWaterEntryHappened = {
        waterEntryHappened: true,
        ciurl: Ciurl,
    } | {
        waterEntryHappened: false,
    };

    export type Ret_NormalMove = {
        legal: false,
        whyIllegal: string,
    } | {
        legal: true,
        dat: WhetherWaterEntryHappened,
    };

    export type Ret_AfterHalfAcceptance = {
        legal: false,
        whyIllegal: string,
    } | {
        legal: true,
        dat: WhetherWaterEntryHappened,
    };

    export type Ret_RandomEntry = {
        "state": "in_waiting_list" ;
        "access_token": string;
    } | {
        "state": "let_the_game_begin";
        "access_token": string;
        "is_first_move_my_move": boolean;
        "is_IA_down_for_me": boolean
    }

    export type Ret_VsCpuEntry = {
        "state": "let_the_game_begin";
        "access_token": string; 
        "is_first_move_my_move": boolean; 
        "is_IA_down_for_me": boolean;
    }

    export type Ret_RandomPoll = {
        legal: false,
        whyIllegal: string,
    } | {
        legal: true,
        ret: Ret_RandomEntry,
    };

    export type Ret_RandomCancel = {
        legal: false;
        whyIllegal: string
    } | {
        legal: true,
        cancellable: boolean,
    };

    export type Ret_WhetherTyMokPoll = {
        legal: true, content: "ty mok1" | {is_first_move_my_move: boolean | null} | "not yet"
      } | {legal: false, whyIllegal: string};

    export type Ret_MainPoll = { legal: true; message?: string, content: MoveToBePolled | "not yet" } | { legal: false; whyIllegal: string };
    export type Ret_InfPoll = {legal: true, content: MoveToBePolled | "not yet"} | {legal: false, whyIllegal: string};

