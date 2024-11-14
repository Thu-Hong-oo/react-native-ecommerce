import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Search({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Pressable onPress={()=>navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            color="#555"
            style={styles.backIcon}
          />
        </Pressable>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
      </View>

      {/* Last Search Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Last Search</Text>
          <TouchableOpacity>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>
          {["Electronics", "Pants", "Three Second", "Long shirt"].map(
            (tag, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{tag}</Text>
                <Icon
                  name="times"
                  size={12}
                  color="#555"
                  style={styles.tagIcon}
                />
              </View>
            )
          )}
        </View>
      </View>

      {/* Popular Search Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Search</Text>
        {[
          {
            name: "Lunilo Hilis jacket",
            searches: "1.6k Search today",
            label: "Hot",
            labelColor: "#EF4444",
          },
          {
            name: "Denim Jeans",
            searches: "1k Search today",
            label: "New",
            labelColor: "#F59E0B",
          },
          {
            name: "Redil Backpack",
            searches: "1.23k Search today",
            label: "Popular",
            labelColor: "#10B981",
          },
          {
            name: "JBL Speakers",
            searches: "1k Search today",
            label: "New",
            labelColor: "#F59E0B",
          },
        ].map((item, index) => (
          <View style={styles.popularItem} key={index}>
            <Image
              source={{ uri: "https://placehold.co/50x50" }}
              style={styles.popularImage}
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>{item.name}</Text>
              <Text style={styles.popularSearches}>{item.searches}</Text>
            </View>
            <View style={[styles.label, { backgroundColor: item.labelColor }]}>
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backIcon: {
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  clearButton: {
    fontSize: 14,
    color: "#8B5CF6",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#4B5563",
    marginRight: 4,
  },
  tagIcon: {
    marginLeft: 4,
  },
  popularItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  popularImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  popularTextContainer: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  popularSearches: {
    fontSize: 12,
    color: "#6B7280",
  },
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
});
