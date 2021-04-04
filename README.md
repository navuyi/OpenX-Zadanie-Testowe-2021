# OpenX-Zadanie-Testowe-2021
- Program dotyczy wariantu drugiego z podanej instrukcji i został opracowany w języku Javascript przy użyciu środowiska Node.js.
- W celu testowania poszczególnych funkcjonalności programu
    zostały utworzone dodatkowe pliki z danymi w formacie json, które zostaną opisane poniżej.
- Program należy uruchomić w środowisku node z parametrem, który jest liczbą całkowitą w zakresie 0-4 - szczegóły poniżej.
 
# Parametry programu

0. ``` node wariant_2_node.js 0 ``` - uruchomienie programu z domyślnymi
danymi pobieranymi z podanych w instrukcji endpointów.

- Dla dalszych podpunktów program nie wykonuje zaciągania danych z sieci ale wczytuje dane testowe z plików w formacie json, które stanowią modyfikację danych podanych w instrukcji zadania.

1. ``` node wariant_2_node.js 1``` - zduplikowane tytuły postów i zróżnicowanie ilości postów na użytkownika

2. ``` node wariant_2_node.js 2``` - użytkownik bez żadnych postów np. brak postów z userId=2

3. ``` node wariant_2_node.js 3``` - posty z identyfikatorem użytkownika, który nie koresponduje z żadnym użytkownikiem, wymieszanie kolejności użytkowników tak aby ich id nie było ciągiem rosnącym jak domyślnie 1,2,...,10

4. ``` node wariant_2_node.js 4``` - zmodyfikowanie danych o użytkownikach i ich współrzędnych zamieszkania tak aby jeden użytkownik miał kilku sąsiadów. Jeśli dwóch użytkowników ma takie same współrzędne to stają się oni swoimi sąsiadami. Odległość pomiędzy nimi wynosi 0.
