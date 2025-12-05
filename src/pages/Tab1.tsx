import {
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
import { useState } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState('');

  const updateField = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Preencha todos os campos para cadastrar.');
      return;
    }
    setError('');
    setSubmitted({ name: form.name, email: form.email });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cadastro</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Formulário de cadastro</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Nome completo</IonLabel>
                  <IonInput
                    data-cy="signup-name"
                    value={form.name}
                    onIonInput={(e) => updateField('name')(e.detail.value ?? '')}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">E-mail</IonLabel>
                  <IonInput
                    data-cy="signup-email"
                    type="email"
                    value={form.email}
                    onIonInput={(e) => updateField('email')(e.detail.value ?? '')}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Senha</IonLabel>
                  <IonInput
                    data-cy="signup-password"
                    type="password"
                    value={form.password}
                    onIonInput={(e) => updateField('password')(e.detail.value ?? '')}
                    required
                  />
                </IonItem>
              </IonList>
              {error && (
                <IonText color="danger" data-cy="signup-error">
                  <p>{error}</p>
                </IonText>
              )}
              <IonButton type="submit" expand="block" data-cy="signup-submit" className="ion-margin-top">
                Cadastrar
              </IonButton>
            </form>

            {submitted && (
              <IonCard color="success" className="ion-margin-top" data-cy="signup-success">
                <IonCardHeader>
                  <IonCardTitle>Cadastro concluído</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    Bem-vindo, <strong>{submitted.name}</strong>!
                  </p>
                  <p>E-mail cadastrado: {submitted.email}</p>
                </IonCardContent>
              </IonCard>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
