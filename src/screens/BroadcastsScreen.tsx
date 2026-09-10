import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { useAppStore } from '@store/useAppStore';
import { Header, Card, Button } from '@components/index';
import { COLORS, SPACING, FONT_SIZES } from '@utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Broadcast } from '@types/index';
import { generateId } from '@utils/helpers';

interface BroadcastsScreenProps {
  navigation: any;
}

const BroadcastsScreen: React.FC<BroadcastsScreenProps> = ({ navigation }) => {
  const { broadcasts, addBroadcast, allGroups } = useAppStore();
  const [broadcastName, setBroadcastName] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const handleCreateBroadcast = () => {
    if (!broadcastName.trim()) {
      Alert.alert('Ошибка', 'Введите название рассылки');
      return;
    }

    if (!broadcastMessage.trim()) {
      Alert.alert('Ошибка', 'Введите текст сообщения');
      return;
    }

    if (selectedGroupIds.length === 0) {
      Alert.alert('Ошибка', 'Выберите хотя бы одну группу');
      return;
    }

    const selectedGroups = allGroups.filter((g) =>
      selectedGroupIds.includes(g.id),
    );

    const newBroadcast: Broadcast = {
      id: generateId(),
      name: broadcastName,
      message: {
        id: generateId(),
        text: broadcastMessage,
        type: 'text',
        createdAt: new Date(),
      },
      groups: selectedGroups,
      status: 'draft',
      totalRecipients: selectedGroups.reduce(
        (sum, g) => sum + g.participantsCount,
        0,
      ),
      sentCount: 0,
      failedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addBroadcast(newBroadcast);
    Alert.alert('Успех', 'Рассылка создана!');

    // Reset form
    setBroadcastName('');
    setBroadcastMessage('');
    setSelectedGroupIds([]);
  };

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Рассылки"
        subtitle={`${broadcasts.length} рассылок`}
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Новая рассылка</Text>

          <Text style={styles.label}>Название</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите название рассылки"
            value={broadcastName}
            onChangeText={setBroadcastName}
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.label}>Сообщение</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Введите текст сообщения"
            value={broadcastMessage}
            onChangeText={setBroadcastMessage}
            placeholderTextColor={COLORS.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Выберите группы</Text>
          <View style={styles.groupsList}>
            {allGroups.map((group) => (
              <Card
                key={group.id}
                style={[
                  styles.groupCheckCard,
                  selectedGroupIds.includes(group.id) &&
                    styles.groupCheckCardSelected,
                ]}
              >
                <Icon
                  name={
                    selectedGroupIds.includes(group.id)
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  size={24}
                  color={COLORS.primary}
                  onPress={() => toggleGroupSelection(group.id)}
                />
                <View style={styles.groupCheckInfo}>
                  <Text style={styles.groupCheckName}>{group.name}</Text>
                  <Text style={styles.groupCheckCount}>
                    {group.participantsCount} участников
                  </Text>
                </View>
              </Card>
            ))}
          </View>

          {selectedGroupIds.length > 0 && (
            <Text style={styles.selectedCount}>
              Выбрано групп: {selectedGroupIds.length}
            </Text>
          )}

          <Button
            title="Создать рассылку"
            onPress={handleCreateBroadcast}
            variant="primary"
            size="medium"
            style={styles.createButton}
          />
        </Card>

        {/* Recent Broadcasts */}
        {broadcasts.length > 0 && (
          <Card style={styles.recentCard}>
            <Text style={styles.sectionTitle}>Последние рассылки</Text>
            {broadcasts.slice(0, 3).map((broadcast) => (
              <View key={broadcast.id} style={styles.broadcastItem}>
                <Icon name="mail" size={20} color={COLORS.primary} />
                <View style={styles.broadcastInfo}>
                  <Text style={styles.broadcastName}>{broadcast.name}</Text>
                  <Text style={styles.broadcastStatus}>
                    Статус: {broadcast.status}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        )}
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
  formCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  messageInput: {
    height: 100,
    paddingTop: SPACING.md,
  },
  groupsList: {
    marginTop: SPACING.md,
  },
  groupCheckCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  groupCheckCardSelected: {
    backgroundColor: `${COLORS.primary}10`,
  },
  groupCheckInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  groupCheckName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  groupCheckCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  selectedCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    marginTop: SPACING.md,
    fontWeight: '500',
  },
  createButton: {
    marginTop: SPACING.lg,
  },
  recentCard: {
    marginBottom: SPACING.lg,
  },
  broadcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  broadcastInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  broadcastName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  broadcastStatus: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});

export default BroadcastsScreen;
