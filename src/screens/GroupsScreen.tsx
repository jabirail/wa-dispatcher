import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppStore } from '@store/useAppStore';
import { Header, Card, Button } from '@components/index';
import { COLORS, SPACING, FONT_SIZES } from '@utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Group } from '@types/index';

interface GroupsScreenProps {
  navigation: any;
}

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation }) => {
  const { allGroups, deleteGroup } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(allGroups);

  useEffect(() => {
    const filtered = allGroups.filter((group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredGroups(filtered);
  }, [searchQuery, allGroups]);

  const handleDeleteGroup = (groupId: string, groupName: string) => {
    Alert.alert(
      'Удалить группу',
      `Вы уверены, что хотите удалить группу "${groupName}"?`,
      [
        { text: 'Отмена', onPress: () => {} },
        {
          text: 'Удалить',
          onPress: () => deleteGroup(groupId),
          style: 'destructive',
        },
      ],
    );
  };

  const renderGroupItem = ({ item }: { item: Group }) => (
    <Card style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <View style={styles.groupInfo}>
          <Icon name="group" size={28} color={COLORS.primary} />
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupCount}>
              {item.participantsCount} участников
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteGroup(item.id, item.name)}
          style={styles.deleteButton}
        >
          <Icon name="more-vert" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Группы"
        subtitle={`${filteredGroups.length} групп`}
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {filteredGroups.length > 0 ? (
          <FlatList
            data={filteredGroups}
            renderItem={renderGroupItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="inbox" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Нет групп</Text>
            <Text style={styles.emptySubtext}>
              Подключите WhatsApp для загрузки групп
            </Text>
          </View>
        )}
      </View>
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
  listContainer: {
    paddingVertical: SPACING.sm,
  },
  groupCard: {
    marginBottom: SPACING.md,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  groupName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  groupCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});

export default GroupsScreen;
