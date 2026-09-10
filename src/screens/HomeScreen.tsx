import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useAppStore } from '@store/useAppStore';
import { Header, Card, Button } from '@components/index';
import { COLORS, SPACING, FONT_SIZES } from '@utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    whatsappConnection,
    folders,
    allGroups,
    broadcasts,
  } = useAppStore();

  const [stats, setStats] = useState({
    folders: 0,
    groups: 0,
    broadcasts: 0,
    sentBroadcasts: 0,
  });

  useEffect(() => {
    setStats({
      folders: folders.length,
      groups: allGroups.length,
      broadcasts: broadcasts.length,
      sentBroadcasts: broadcasts.filter((b) => b.status === 'completed').length,
    });
  }, [folders, allGroups, broadcasts]);

  const navigateToConnect = () => {
    navigation.navigate('Settings', { screen: 'ConnectWhatsApp' });
  };

  return (
    <View style={styles.container}>
      <Header
        title="WA Dispatcher"
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Connection Status */}
        <Card style={styles.connectionCard}>
          <View style={styles.connectionHeader}>
            <Icon
              name={whatsappConnection.isConnected ? 'check-circle' : 'error'}
              size={24}
              color={whatsappConnection.isConnected ? COLORS.success : COLORS.error}
            />
            <Text style={styles.connectionTitle}>
              {whatsappConnection.isConnected ? 'Подключено' : 'Не подключено'}
            </Text>
          </View>
          {whatsappConnection.phoneNumber && (
            <Text style={styles.connectionPhone}>
              {whatsappConnection.phoneNumber}
            </Text>
          )}
          {!whatsappConnection.isConnected && (
            <Button
              title="Подключить WhatsApp"
              onPress={navigateToConnect}
              variant="primary"
              size="small"
              style={styles.connectButton}
            />
          )}
        </Card>

        {/* Statistics */}
        <Text style={styles.sectionTitle}>Статистика</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Icon name="folder" size={32} color={COLORS.primary} />
            <Text style={styles.statNumber}>{stats.folders}</Text>
            <Text style={styles.statLabel}>Папок</Text>
          </Card>
          <Card style={styles.statCard}>
            <Icon name="group" size={32} color={COLORS.primary} />
            <Text style={styles.statNumber}>{stats.groups}</Text>
            <Text style={styles.statLabel}>Групп</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Icon name="mail" size={32} color={COLORS.primary} />
            <Text style={styles.statNumber}>{stats.broadcasts}</Text>
            <Text style={styles.statLabel}>Рассылок</Text>
          </Card>
          <Card style={styles.statCard}>
            <Icon name="check" size={32} color={COLORS.success} />
            <Text style={styles.statNumber}>{stats.sentBroadcasts}</Text>
            <Text style={styles.statLabel}>Отправлено</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Быстрые действия</Text>
        <Button
          title="+ Создать папку"
          onPress={() => navigation.navigate('Folders')}
          variant="primary"
          size="medium"
          style={styles.actionButton}
        />
        <Button
          title="+ Создать рассылку"
          onPress={() => navigation.navigate('Broadcasts')}
          variant="primary"
          size="medium"
          style={styles.actionButton}
        />
        <Button
          title="Просмотреть группы"
          onPress={() => navigation.navigate('Groups')}
          variant="outline"
          size="medium"
          style={styles.actionButton}
        />
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
  connectionCard: {
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  connectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  connectionPhone: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  connectButton: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statCard: {
    width: (width - SPACING.md * 3) / 2,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: SPACING.sm,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
});

export default HomeScreen;
