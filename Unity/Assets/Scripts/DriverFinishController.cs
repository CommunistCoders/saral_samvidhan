using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;
public class DriverFinishController : MonoBehaviour
{
    public GameObject panel;
    public GameObject goodMessage;
    public GameObject badMessage;

    public TMP_Text collision;
    public TMP_Text collisionFinal;
    public TMP_Text trafficViolation;
    public TMP_Text trafficViolationFinal;

    public GameObject exitButton;

    void Start()
    {
        panel.SetActive(false);
        goodMessage.SetActive(false);
        badMessage.SetActive(false);

    }

    public void Finish(bool good)
    {
        panel.SetActive(true);
        goodMessage.SetActive(good);
        badMessage.SetActive(!good);
        collisionFinal.text = collision.text;
        trafficViolationFinal.text = trafficViolation.text;
        exitButton.GetComponent<UnityEngine.UI.Button>().onClick.AddListener(() => { SceneManager.LoadScene("MenuScene"); });
    }
}
