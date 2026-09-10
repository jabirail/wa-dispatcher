import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useAppStore } from '@store/useAppStore';
import { Header, Card, Button } from '@components/index';
import { COLORS, SPACING, FONT_SIZES } from '@utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { settings, updateSettings, whatsappConnection, setWhatsAppConnection } =
    useAppStore();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleThemeToggle = () => {
    const newTheme = localSettings.theme === 'light' ? 'dark' : 'light';
    setLocalSettings({ ...localSettings, theme: newTheme });
    updateSettings({ theme: newTheme });
  };

  const handleNotificationsToggle = () => {
    const newNotifications = !localSettings.notifications;
    setLocalSettings({ ...localSettings, notifications: newNotifications });
    updateSettings({ notifications: newNotifications });
  };

  const handleAutoSaveToggle = () => {
    const newAutoSave = !localSettings.autoSave;
    setLocalSettings({ ...localSettings, autoSave: newAutoSave });
    updateSettings({ autoSave: newAutoSave });
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Отключить WhatsApp',
      'Вы уверены, что хотите отключить WhatsApp?',
      [
        { text: 'Отмена', onPress: () => {} },
        {
          text: 'Отключить',
          onPress: () => {
            setWhatsAppConnection({ isConnected: false });
            Alert.alert('Успех', 'WhatsApp отключен');
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Настройки"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* WhatsApp Connection */}
        <Text style={styles.sectionTitle}>WhatsApp</Text>
        <Card style={styles.connectionCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="whatsapp" size={28} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Статус подключения</Text>
                <Text style={styles.settingValue}>
                  {whatsappConnection.isConnected ? 'Подключено' : 'Не подключено'}
                </Text>
              </View>
            </View>
          </View>

          {whatsappConnection.phoneNumber && (
            <View style={styles.phoneRow}>
              <Icon name="phone" size={20} color={COLORS.primary} />
              <Text style={styles.phoneNumber}>
                {whatsappConnection.phoneNumber}
              </Text>
            </View>
          )}

          {whatsappConnection.isConnected && (
            <Button
              title="Отключить"
              onPress={handleDisconnect}
              variant="outline"
              size="small"
              style={styles.disconnectButton}
            />
          )}
        </Card>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>Приложение</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Icon name="brightness-4" size={24} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Тема</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {localSettings.theme === 'light' ? 'Светлая' : 'Тёмная'}
              </Text>
              <Switch
                value={localSettings.theme === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={localSettings.theme === 'dark' ? COLORS.primary : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={[styles.settingRow, styles.borderTop]}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={24} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Уведомления</Text>
            </View>
            <Switch
              value={localSettings.notifications}
              onValueChange={handleNotificationsToggle}
              trackColor={{
                false: COLORS.border,
                true: `${COLORS.primary}80`,
              }}
              thumbColor={localSettings.notifications ? COLORS.primary : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingRow, styles.borderTop]}>
            <View style={styles.settingInfo}>
              <Icon name="save" size={24} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Автосохранение</Text>
            </View>
            <Switch
              value={localSettings.autoSave}
              onValueChange={handleAutoSaveToggle}
              trackColor={{
                false: COLORS.border,
                true: `${COLORS.primary}80`,
              }}
              thumbColor={localSettings.autoSave ? COLORS.primary : '#f4f3f4'}
            />
          </View>
        </Card>

        {/* About */}
        <Text style={styles.sectionTitle}>О приложении</Text>
        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>WA Dispatcher</Text>
          <Text style={styles.aboutVersion}>Версия 1.0.0</Text>
          <Text style={styles.aboutDescription}>
            Управление группами и рассылками в WhatsApp
          </Text>

          <TouchableOpacity style={styles.aboutLink}>
            <Text style={styles.aboutLinkText}>Политика конфиденциальности</Text>
            <Icon name="open-in-new" size={16} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutLink}>
            <Text style={styles.aboutLinkText}>Условия использования</Text>
            <Icon name="open-in-new" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  connectionCard: {
    marginBottom: SPACING.lg,
  },
  settingsCard: {
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: SPACING.md,
  },
  settingLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  settingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.md,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  phoneNumber: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  disconnectButton: {
    marginTop: SPACING.md,
  },
  aboutCard: {
    marginBottom: SPACING.xxl,
  },
  aboutTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  aboutVersion: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  aboutDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  aboutLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SPACING.md,
  },
  aboutLinkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
  },
});

export default SettingsScreen;
