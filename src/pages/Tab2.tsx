import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useMemo, useState } from 'react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [amount, setAmount] = useState('50');
  const [team, setTeam] = useState<'azul' | 'vermelho'>('azul');
  const [ticket, setTicket] = useState<{ amount: string; team: 'azul' | 'vermelho' } | null>(null);
  const [result, setResult] = useState('');

  const describeTeam = (value: 'azul' | 'vermelho') => (value === 'azul' ? 'Time Azul' : 'Time Vermelho');

  const currentTeamLabel = useMemo(() => describeTeam(team), [team]);
  const ticketTeamLabel = useMemo(
    () => (ticket ? describeTeam(ticket.team) : currentTeamLabel),
    [ticket, currentTeamLabel]
  );

  const resolveOutcome = () => {
    const numeric = Number(ticket?.amount ?? 0);
    const winner = numeric % 2 === 0 ? 'azul' : 'vermelho';
    return winner === 'azul' ? 'Time Azul venceu' : 'Time Vermelho venceu';
  };

  const registerBet = () => {
    if (!amount) return;
    setTicket({ amount, team });
    setResult('');
  };

  const revealResult = () => {
    if (!ticket) return;
    setResult(resolveOutcome());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Apostas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Apostas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Monte seu bilhete</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem lines="none" className="ion-margin-bottom">
                <IonLabel>Escolha seu time</IonLabel>
                <div className="ion-padding-start" data-cy="team-selector">
                  <IonButton
                    size="small"
                    fill={team === 'azul' ? 'solid' : 'outline'}
                    onClick={() => setTeam('azul')}
                    data-cy="team-azul"
                  >
                    Time Azul
                  </IonButton>
                  <IonButton
                    size="small"
                    fill={team === 'vermelho' ? 'solid' : 'outline'}
                    onClick={() => setTeam('vermelho')}
                    data-cy="team-vermelho"
                    className="ion-margin-start"
                  >
                    Time Vermelho
                  </IonButton>
                </div>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Valor da aposta (R$)</IonLabel>
                <IonInput
                  data-cy="bet-amount"
                  inputmode="decimal"
                  type="number"
                  value={amount}
                  onIonInput={(e) => setAmount(e.detail.value ?? '')}
                  required
                />
              </IonItem>
            </IonList>

            <IonButton expand="block" className="ion-margin-top" onClick={registerBet} data-cy="bet-submit">
              Registrar palpite
            </IonButton>

            {ticket && (
              <IonCard color="warning" className="ion-margin-top" data-cy="bet-summary">
                <IonCardHeader>
                  <IonCardTitle>Palpite registrado</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    Time escolhido: <strong>{ticketTeamLabel}</strong>
                  </p>
                  <p>
                    Valor: <IonBadge color="tertiary">R$ {ticket.amount}</IonBadge>
                  </p>
                  <IonText color="medium">
                    <small>Regra rápida: apostas com valor par favorecem o Time Azul.</small>
                  </IonText>
                </IonCardContent>
              </IonCard>
            )}

            <IonButton
              expand="block"
              color="tertiary"
              className="ion-margin-top"
              onClick={revealResult}
              data-cy="bet-reveal"
              disabled={!ticket}
            >
              Revelar resultado
            </IonButton>

            {result && (
              <IonCard color="success" className="ion-margin-top" data-cy="bet-result">
                <IonCardHeader>
                  <IonCardTitle>Resultado oficial</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>{result}</p>
                  <p>
                    Seu palpite: <strong>{ticketTeamLabel}</strong>
                  </p>
                </IonCardContent>
              </IonCard>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
