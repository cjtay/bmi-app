import * as React from 'react';

import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmiResults: React.FC<{ result: number }> = (props) => {
    let category;
    if (props.result >= 30) {
        category = 'Obese';
    } else if (props.result >= 25 && props.result < 30) {
        category = 'Overweight';
    } else if (props.result >= 18.5 && props.result < 25) {
        category = 'Normal';
    } else if (props.result < 18.5) {
        category = 'Underweight';
    } else {
        category = 'NA';
    }
    return (
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h3>Your BMI</h3>
                        {props.result >= 30 ? (
                            <h1
                                style={{
                                    color: 'red',
                                    fontSize: '3rem',
                                    fontWeight: 'bolder',
                                }}
                            >
                                {props.result.toFixed(2)}
                            </h1>
                        ) : (
                            <h1
                                style={{
                                    color: 'green',
                                    fontSize: '3rem',
                                }}
                            >
                                {props.result.toFixed(2)}
                            </h1>
                        )}
                        <p>{category}</p>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmiResults;
