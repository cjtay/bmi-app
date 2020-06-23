import React, { useRef, useState } from 'react';
import BmiControls from './components/BmiControls';
import BmiResults from './components/BmiResults';
import InputControls from './components/InputControls';
import {
    IonApp,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonAlert,
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
    const [result, setResult] = useState<number>(-1);
    const [error, setError] = useState<string>();
    const [calculatedUnits, setCalculatedUnits] = useState<'mkg' | 'ftlbs'>(
        'mkg'
    );

    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if (
            !enteredHeight ||
            !enteredWeight ||
            +enteredHeight <= 0 ||
            +enteredWeight <= 0
        ) {
            setError('Please enter valid numbers');
            return;
        }

        const weightConversionFactor = calculatedUnits === 'ftlbs' ? 2.2 : 1;
        const heightConversionFactor = calculatedUnits === 'ftlbs' ? 3.28 : 1;

        const weight = +enteredWeight / weightConversionFactor;
        const height = +enteredHeight / heightConversionFactor;

        const bmi = weight / (height * height);
        setResult(bmi);
        console.log('bmi: ', bmi);
        console.log('weight: ', weight);
        console.log('height: ', height);
    };
    const resetBMI = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
        setResult(-1);
    };

    const clearError = () => {
        setError('');
    };

    const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
        setCalculatedUnits(selectedValue);
    };

    return (
        <IonApp>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>React Ionic BMI Calculator App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[{ text: 'ok', handler: clearError }]}
            />
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <InputControls
                                selectedUnit={calculatedUnits}
                                onSelectValue={selectCalcUnitHandler}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">
                                    Your height (
                                    {calculatedUnits === 'mkg' ? 'm' : 'ft'})
                                </IonLabel>
                                <IonInput
                                    type="number"
                                    ref={heightInputRef}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">
                                    Your weight (
                                    {calculatedUnits === 'mkg' ? 'kg' : 'lbs'})
                                </IonLabel>
                                <IonInput
                                    type="number"
                                    ref={weightInputRef}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <BmiControls
                        onCalculate={calculateBMI}
                        onReset={resetBMI}
                    />
                    {result !== -1 && <BmiResults result={result} />}
                </IonGrid>
            </IonContent>
        </IonApp>
    );
};

export default App;
