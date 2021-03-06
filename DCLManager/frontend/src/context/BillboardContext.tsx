// noinspection JSIgnoredPromiseFromCall

import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { DCLBillboardContext } from "../hardhat/SymfoniContext";
import { IBillboard } from "../types";
import { BigNumber } from "ethers";

type ContextProps = {
  billboardCount: number;
  setBillboardCount: Dispatch<SetStateAction<number>>;
  billboards: IBillboard[];
  setBillboards: Dispatch<SetStateAction<IBillboard[]>>;
  createBillboard: (
    _targetId: string,
    _description: string,
    _parcel: string,
    _realm: string,
    _rate: BigNumber
  ) => Promise<void>;
};

const BillboardContext = React.createContext<Partial<ContextProps>>({});

function BillboardProvider(props: { children: JSX.Element }) {
  const dclbillboardCtx = useContext(DCLBillboardContext);
  const [billboardCount, setBillboardCount] = useState(0);
  const [billboards, setBillboards] = useState<IBillboard[]>([]);

  useEffect(() => {
    const initalizeCount = async () => {
      let _billboardCount = 0;
      try {
        if (dclbillboardCtx.instance) {
          _billboardCount = (
            await dclbillboardCtx.instance.billboardCount()
          ).toNumber();
        }
      } catch (e) {
      } finally {
        setBillboardCount(_billboardCount);
      }
    };
    initalizeCount();
  }, [dclbillboardCtx.instance]);

  useEffect(() => {
    const initializeBillboards = async () => {
      if (dclbillboardCtx.instance) {
        const _billBoards = [];
        for (let i = billboardCount; i >= 1; i--) {
          const billboard = await dclbillboardCtx.instance.billboards(i);
          _billBoards.push(billboard);
        }
        setBillboards(_billBoards);
      }
    };
    initializeBillboards();
  }, [dclbillboardCtx.instance, billboardCount]);

  // @ts-ignore
  const createBillboard = async (
    _targetId: string,
    _description: string,
    _parcel: string,
    _realm: string,
    _rate: BigNumber
  ) => {
    if (dclbillboardCtx.instance) {
      console.log("Submitting to the contract: ", _description);
      const saveTx = await dclbillboardCtx.instance.createBillboard(
        _targetId,
        _description,
        _parcel,
        _realm,
        _rate
      );
      await saveTx.wait();
      setBillboardCount(billboardCount + 1);
    }
  };

  return (
    <BillboardContext.Provider
      value={{
        billboardCount,
        setBillboardCount,
        billboards,
        setBillboards,
        createBillboard
      }}
    >
      {props.children}
    </BillboardContext.Provider>
  );
}

export { BillboardProvider, BillboardContext };
