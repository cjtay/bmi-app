import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const InputControls: React.FC<{
    selectedUnit: 'mkg' | 'ftlbs';
    onSelectValue: (value: 'mkg' | 'ftlbs') => void;
}> = (props) => {
    const inputChangeHander = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value);
    };
    return (
        <IonSegment value={props.selectedUnit} onIonChange={inputChangeHander}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default InputControls;
