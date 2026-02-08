import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonInput, IonSelect, IonSelectOption,
  IonTextarea, IonButton
} from "@ionic/react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const AddExpense: React.FC = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const saveExpense = async () => {
    await addDoc(collection(db, "expenses"), {
      title,
      amount: Number(amount),
      type,
      category,
      note,
      createdAt: new Date(),
    });

    history.push("/tabs/list");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>เพิ่มรายการรายรับ–รายจ่าย</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="ชื่อรายการ"
          value={title}
          onIonChange={e => setTitle(e.detail.value!)}
        />

        <IonInput
          label="จำนวนเงิน"
          type="number"
          value={amount}
          onIonChange={e => setAmount(Number(e.detail.value))}
        />

        <IonSelect
          label="ประเภท"
          value={type}
          onIonChange={e => setType(e.detail.value)}
        >
          <IonSelectOption value="income">รายรับ</IonSelectOption>
          <IonSelectOption value="expense">รายจ่าย</IonSelectOption>
        </IonSelect>

        <IonInput
          label="หมวดหมู่"
          value={category}
          onIonChange={e => setCategory(e.detail.value!)}
        />

        <IonTextarea
          label="หมายเหตุ"
          value={note}
          onIonChange={e => setNote(e.detail.value!)}
        />

        <IonButton expand="block" onClick={saveExpense}>
          บันทึกข้อมูล
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddExpense;