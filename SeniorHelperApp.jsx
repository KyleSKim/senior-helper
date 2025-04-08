
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const favoriteContacts = [
  { name: "김영희", number: "010-1234-5678" },
  { name: "박철수", number: "010-9876-5432" },
  { name: "이순자", number: "010-4567-8901" },
  { name: "정재훈", number: "010-2345-6789" },
  { name: "한미영", number: "010-3456-7890" },
];

const defaultSolutions = [
  "Wi-Fi 연결 상태를 확인하세요.",
  "휴대폰을 재시작해보세요.",
  "유튜브 앱을 최신 버전으로 업데이트 하세요.",
  "데이터가 충분한지 확인하세요.",
  "앱 캐시를 삭제해보세요."
];

const localRestaurants = [
  { name: "김밥천국", category: "한식", location: "서울 중구" },
  { name: "홍콩반점", category: "중식", location: "서울 중구" },
  { name: "스타벅스", category: "카페", location: "서울 중구" },
  { name: "맥도날드", category: "패스트푸드", location: "서울 중구" },
];

export default function SeniorHelperApp() {
  const [contacts, setContacts] = useState(favoriteContacts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("contacts");
  const [restaurantSearch, setRestaurantSearch] = useState("");

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(search)
  );

  const filteredRestaurants = localRestaurants.filter((r) =>
    r.category.includes(restaurantSearch)
  );

  return (
    <div className="p-4 grid gap-4 max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setPage("contacts")}>연락처</Button>
        <Button onClick={() => setPage("youtube")}>유튜브 문제</Button>
        <Button onClick={() => setPage("map")}>동네 음식점</Button>
      </div>

      {page === "contacts" && (
        <>
          <h1 className="text-2xl font-bold text-center">자주 연락하는 사람</h1>
          <Input
            placeholder="이름 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-lg"
          />
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="rounded-2xl shadow-md">
                <CardContent className="flex items-center justify-between p-4">
                  <span className="text-xl font-medium">{contact.name}</span>
                  <Button
                    className="rounded-full p-2"
                    onClick={() => handleCall(contact.number)}
                  >
                    <Phone />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </>
      )}

      {page === "youtube" && (
        <>
          <h1 className="text-2xl font-bold text-center">유튜브 안 될 때 해결 방법</h1>
          <ul className="list-disc list-inside text-lg">
            {defaultSolutions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {page === "map" && (
        <>
          <h1 className="text-2xl font-bold text-center">동네 음식점 검색</h1>
          <Input
            placeholder="예: 한식, 중식, 카페"
            value={restaurantSearch}
            onChange={(e) => setRestaurantSearch(e.target.value)}
            className="text-lg"
          />
          {filteredRestaurants.map((r, idx) => (
            <Card key={idx} className="mt-2 p-4 rounded-2xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.location} • {r.category}</div>
                </div>
                <MapPin />
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
